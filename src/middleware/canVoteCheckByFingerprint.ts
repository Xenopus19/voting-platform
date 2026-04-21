import { Request, Response, NextFunction } from "express";
import Fingerprint from "../models/Fingerprint";

const canVoteCheckByFingerprint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const voteId = req.params.id;
  if (!req.body.fingerprint) {
    return res.status(401).send("No fingerprint found.");
  }
  const recordedFingerprint = await Fingerprint.findOne({
    where: { voteId, fingerprint: req.body.fingerprint },
  });
  if (recordedFingerprint) {
    return res.status(403).json({ canVote: false, message: 'You have already voted on this vote.'});
  }
  next();
};

export default canVoteCheckByFingerprint;
