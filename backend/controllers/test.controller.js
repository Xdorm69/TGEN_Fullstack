import mongoose from "mongoose";
import { TestStats } from "../models/stats.model.js";
import { Subject } from "../models/subject.model.js";
import { Test } from "../models/test.model.js";

const getAllTests = async (req, res) => {
  try {
    const allTests = await Test.find(
      {},
      {
        name: 1,
        subject: 1,
        description: 1,
        "questions._id": 1,
        createdAt: 1,
        updatedAt: 1,
        author: 1,
      },
    )
      .populate("author", "name")
      .lean();
    res.status(200).json({
      success: true,
      data: allTests,
      message: "Tests fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const getTestById = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findById(id, {
      name: 1,
      subject: 1,
      description: 1,
      tags: 1,
      "questions.difficulty": 1,
    }).lean();

    if (!test || !test.subject) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Test not found",
      });
    }

    const difficultyCount = { easy: 0, medium: 0, hard: 0 };

    for (const q of test.questions) {
      difficultyCount[q.difficulty]++;
    }

    const subject = await Subject.findById(test.subject);

    return res.status(200).json({
      message: "Test fetched successfully",
      success: true,
      data: [
        {
          _id: test._id,
          name: test.name,
          subject: subject.name,
          subjectColor: subject.color,
          description: test.description,
          totalQuestions: test.questions.length,
          difficulty: difficultyCount,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

const getLeaderboard = async (req, res) => {
  const { id } = req.params;
  try {
    const leaderboard = await TestStats.aggregate([
      // 1️⃣ Only attempts for this test
      {
        $match: {
          test: new mongoose.Types.ObjectId(id),
        },
      },

      // 2️⃣ Group by user → pick best values
      {
        $group: {
          _id: "$user",
          bestScore: { $max: "$score" },
          bestAccuracy: { $max: "$accuracy" },
          bestTimeTaken: { $min: "$timeTaken" },
        },
      },

      // 3️⃣ Sort leaderboard
      {
        $sort: {
          bestScore: -1,
          bestAccuracy: -1,
          bestTimeTaken: 1,
        },
      },

      // 4️⃣ Join user info
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      // 5️⃣ Flatten user array
      { $unwind: "$user" },

      // 6️⃣ Shape final response
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          score: "$bestScore",
          accuracy: "$bestAccuracy",
          timeTaken: "$bestTimeTaken",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Leaderboard fetched successfully",
      data: [leaderboard],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

const takeTest = async (req, res) => {
  try{
    const { id } = req.params;
    const test = await Test.findById(id).populate("subject", "name color").lean();

  if (!test) {
    return res.status(404).json({ success: false, data:[],message: "Test not found" });
  }

  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  return res.status(200).json({
    success: true,
    message: "Test fetched successfully",
    data: [{
    _id: test._id,
    name: test.name,
    subject: test.subject,
    description: test.description,
    questions: shuffle(test.questions),
  }]
  });


  } catch(error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
}

const submitTest = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ success: false, data:[] ,message: "Unauthorized" });
    }
    console.log("USER_ID_FROM_COOKIES: " + userId);
  const { answers, timeTaken, test } = req.body;

  let correct = 0;

  const wrongAnswers = [];

  test.questions.forEach((q) => {
    const selectedOptionId = answers[q._id];
    const correctOption = q.options.find((o) => o.isCorrect);

    if (selectedOptionId === correctOption?._id) {
      correct++;
    } else {
      wrongAnswers.push({
        id: q._id,
        question: q.title,
        selectedOption: q.options.find((o) => o._id === selectedOptionId)?.title || "",
        correctOption: correctOption.title,
      });
    }
  });


  const score = correct;
  const accuracy = ((correct / test.questions.length) * 100).toFixed(2);

  await TestStats.create({
    user: userId,
    test: test._id,
    score,
    accuracy,
    timeTaken,
    wrongAttempts: wrongAnswers.map((wa) => wa.id)
  });

  return res.status(200).json({
    success: true,
    message: "Test submitted successfully",
    data: [{
      score,
      accuracy,
      wrongAnswers,
    }],
  });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
}

export { getAllTests, getTestById, getLeaderboard, takeTest, submitTest };
