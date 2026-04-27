import { Response, Router } from "express";
import Vote from "../models/Vote";
import Option from "../models/Option";
import { User } from "../models";
import { CreateVoteSchema, VoteCreationInfoType } from "../schemas/vote.schema";
import tokenExtractor, { CustomRequest } from "../middleware/tokenExtractor";
import Fingerprint, { NewFingerprintAttributes } from "../models/Fingerprint";
import voteFinder from "../middleware/voteFinder";
import canVoteCheck from "../middleware/canVoteCheckByFingerprint";

const router = Router();

router.get("/:id", voteFinder, async (req: CustomRequest, res) => {
  try {
    if (req.vote) {
      return res.json(req.vote);
    }
    return res.status(401).json({
      message: "Error getting vote.",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting vote",
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
      return res.status(401).json({
        message: "User with this id was not found.",
      });
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

router.post(
  "/:id/canVote",
  canVoteCheck,
  async (req: CustomRequest, res: Response) => {
    try {
      return res.json({ canVote: true });
    } catch (error) {
      res.status(400).json({
        message: "Error getting a fingerprint check.",
        details: error instanceof Error ? error.message : error,
      });
    }
  },
);

router.put("/:id", canVoteCheck, async (req: CustomRequest, res: Response) => {
  try {
    if (
      !req.body.optionId ||
      !req.params.id ||
      typeof req.params.id !== "string"
    ) {
      return res.status(401).json({
        message: "Not valid or absent option id or vote id.",
      });
    }

    const option = await Option.findByPk(req.body.optionId);
    if (!option) {
      return res.status(404).json({
        message: "No option with this Id was found.",
      });
    }

    option.votersAmount++;

    await option.save();

    await Fingerprint.create({
      voteId: parseInt(req.params.id),
      fingerprint: req.body.fingerprint,
    });

    return res.status(200).json({ message: "Vote applied successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error applying a vote.",
      details: error instanceof Error ? error.message : error,
    });
  }
});

router.delete(
  "/:id",
  tokenExtractor,
  voteFinder,
  async (req: CustomRequest, res: Response) => {
    try {
      if (!(req.vote?.userId === req.decodedToken.id)) {
        return res.status(400).json({
          message: "You don't have rights to delete this vote.",
        });
      }
      await req.vote?.destroy();
      return res.status(204).send("Vote deleted successfully.");
    } catch (error) {
      res.status(400).json({
        message: "Error deleting a vote.",
        details: error instanceof Error ? error.message : error,
      });
    }
  },
);

export default router;
