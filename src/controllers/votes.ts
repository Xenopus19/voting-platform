import { Router } from "express";
import Vote, { VoteAttributes } from "../models/Vote";
import Option, { NewOptionAttributes } from "../models/Option";
import { User } from "../models";
import { CreateVoteSchema, VoteCreationInfoType } from "../schemas/vote.schema";
import tokenExtractor, { CustomRequest } from "../middleware/tokenExtractor";
import { text } from "node:stream/consumers";

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

export default router;
