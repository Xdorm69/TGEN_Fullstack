export type TestSchema = {
  _id: string;
  name: string;
  author: { _id: string; name: string };
  dateCreated: string;
  description: string;
  questions: {
    _id: string;
    title: string;
    difficulty: string;
    options: {
      _id: string;
      isCorrect: boolean;
      title: string;
    }[];
    tags: string[];
  }[];
  createdAt: Date;
  updatedAt: Date;
};
