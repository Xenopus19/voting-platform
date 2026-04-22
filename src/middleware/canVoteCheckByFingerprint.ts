import { Request, Response, NextFunction } from "express";
import Fingerprint from "../models/Fingerprint";
import { CustomRequest } from "./tokenExtractor";
import voteFinder from "./voteFinder";

const canVoteCheckByFingerprint = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if(!req.vote)
  {
    return res.status(401).send("No vote found.");
  }

  const isExpired = new Date(req.vote.expirationDate) < new Date();
  if(isExpired){
    return res.status(403).json({ canVote: false, message: 'The vote is expired.'});
  }
  
  const voteId = req.vote.id;
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

const canVoteCheck = [voteFinder, canVoteCheckByFingerprint];

export default canVoteCheck;
