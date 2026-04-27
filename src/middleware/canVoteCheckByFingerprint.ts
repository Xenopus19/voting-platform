import { Response, NextFunction } from "express";
import Fingerprint from "../models/Fingerprint";
import { CustomRequest } from "./tokenExtractor";
import voteFinder from "./voteFinder";

const canVoteCheckByFingerprint = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.vote) {
    return res.status(404).json({
      message: "Vote with this id was not found.",
    });
  }

  const isExpired = new Date(req.vote.expirationDate) < new Date();
  if (isExpired) {
    return res
      .status(403)
      .json({ message: "The vote is expired." });
  }

  const voteId = req.vote.id;
  if (!req.body.fingerprint) {
    return res.status(401).json({
      message: "Fingerprint was not found.",
    });
  }
  const recordedFingerprint = await Fingerprint.findOne({
    where: { voteId, fingerprint: req.body.fingerprint },
  });
  if (recordedFingerprint) {
    return res.status(403).json({
      message: "You have already voted on this vote.",
    });
  }
  next();
};

const canVoteCheck = [voteFinder, canVoteCheckByFingerprint];

export default canVoteCheck;
