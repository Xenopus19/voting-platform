import { Response, NextFunction } from "express";
import { User } from "../models";
import { CustomRequest } from "./tokenExtractor";
import Vote from "../models/Vote";
import Option from "../models/Option";

const voteFinder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.id || typeof req.params.id !== "string") {
    return res.status(404).send("Invalid vote id.");
  }
  const voteId = parseInt(req.params.id);
  const vote = await Vote.findByPk(voteId, {
    include: [
      {
        model: Option,
        as: "options",
        attributes: {
          exclude: ["createdAt", "updatedAt", "voteId"],
        },
      },
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
  });
  if (!vote) {
    return res.status(404).send("Vote with this id is nonexistent");
  }
  req.vote = vote;
  next();
};

export default voteFinder;
