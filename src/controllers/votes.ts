import { Router } from "express";
import Vote, { VoteAttributes } from "../models/Vote";
import Option, { NewOptionAttributes } from "../models/Option";
import { User } from "../models";
import { CreateVoteSchema, VoteCreationInfoType } from "../schemas/vote.schema";
import tokenExtractor, { CustomRequest } from "../middleware/tokenExtractor";
import { text } from "node:stream/consumers";
import Fingerprint, { NewFingerprintAttributes } from "../models/Fingerprint";
import canVoteCheckByFingerprint from "../middleware/canVoteCheckByFingerprint";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
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
    res.json(vote);
  } catch (error) {
    res.status(400).json({
      message: "Authorization error",
      details: error instanceof Error ? error.message : error,
    });
  }
});

router.post("/", tokenExtractor, async (req: CustomRequest, res) => {
  try {
    const voteCreationInfo: VoteCreationInfoType =
      await CreateVoteSchema.parseAsync(req.body);
    const user = await User.findByPk(req.decodedToken.id);
    if (!user) {
      return res.status(401).send("User wasn't found.");
    }
    const vote = await Vote.create(
      {
        ...voteCreationInfo,
        userId: user.id,
      },
      {
        include: [
          {
            model: Option,
            as: "options",
          },
        ],
      },
    );
    res.json(vote);
  } catch (error) {
    res.status(400).json({
      message: "Error posting a vote",
      details: error instanceof Error ? error.message : error,
    });
  }
});

router.post("/:id/canVote", canVoteCheckByFingerprint ,async (req, res) => {
  try {
    return res.json({canVote: true})
  } catch (error) {
    res.status(400).json({
      message: "Error getting a fingerprint check.",
      details: error instanceof Error ? error.message : error,
    });
  }
});

router.put("/:id", canVoteCheckByFingerprint ,async (req, res) => {
  try {
    if(!req.body.optionId || !req.params.id || typeof req.params.id !== 'string')
    {
      return res.status(404).send('Not valid or absent option id or vote id.')
    }

    const option = await Option.findByPk(req.body.optionId)
    if(!option){
      return res.status(404).send('No option with this Id was found.')
    }

    option.votersAmount++;

    await option.save();

    await Fingerprint.create({voteId: parseInt(req.params.id), fingerprint: req.body.fingerprint})

    return res.status(200).json({ message: "Vote applied successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error applying a vote.",
      details: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
