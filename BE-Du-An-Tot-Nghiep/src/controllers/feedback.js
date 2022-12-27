import Feedback from "../models/feedback";
import mongoose from "mongoose";
export const serviceFeedback = async (req, res) => {
  req.body.feedbackType = "service";
  try {
    const feedback = await new Feedback(req.body).save();
    res.json(feedback);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const listFeedBackByService = async (req, res) => {
  const { stars } = req.query;
  let starsByLevel = {};
  try {
    const calculateRating = await Feedback.aggregate([
      { $unwind: "$service" },
      {
        $group: {
          _id: "$service",
          ratingAvg: { $avg: "$stars" },
        },
      },
    ]);
    const rating = calculateRating.find((item) => item._id == req.params.svid);
    for (let i = 1; i < 6; i++) {
      const countDocuments = await Feedback.countDocuments({
        service: req.params.svid,
        stars: i,
      });
      starsByLevel[`star${i}`] = countDocuments;
    }
    if (stars) {
      const listFeedback = await Feedback.find({
        service: req.params.svid,
        stars,
      })
        .sort({ createdAt: -1 })
        .populate({ path: "user", select: ["name", "_id", "avatar"] })
        .populate({ path: "userReply", select: ["name", "_id", "avatar"] })
        .exec();
      return res.json({
        listFeedback,
        ratingAvg:  rating.ratingAvg,
        starsByLevel,
      });
    }
    const listFeedback = await Feedback.find({ service: req.params.svid })
      .sort({ stars: "desc" })
      .populate({ path: "user", select: ["name", "_id", "avatar"] })
      .populate({ path: "userReply", select: ["name", "_id", "avatar"] })
      .exec();

    return res.json({
      listFeedback,
      ratingAvg: rating ? rating.ratingAvg : 0,
      starsByLevel,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const adminReplyFeedback = async (req, res) => {
  const update = {
    reply: req.body.reply,
    userReply: req.user._id,
  };
  try {
    const replyFeedback = await Feedback.findOneAndUpdate(
      { _id: req.params.id },
      update,
      { new: true }
    );
    const message = "Trả lời thành công";
    res.json({ message, replyFeedback });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
export const listFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: ["name", "_id", "avatar"] })
      .populate({ path: "userReply", select: ["name", "_id", "avatar"] })
      .exec();
    res.json(feedback);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
