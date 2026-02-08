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

    return NextResponse.json({
      success: true,
      message: "Leaderboard fetched successfully",
      data: [leaderboard],
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export { getAllTests, getTestById, getLeaderboard };
