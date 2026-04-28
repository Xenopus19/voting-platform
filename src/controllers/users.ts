import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

import User, { UserAttributes } from "../models/User";
import { CreateUserSchema, NewUser } from "../schemas/user.schema";
import { JWT_SECRET } from "../config";
import Vote from "../models/Vote";

router.get("/", async (req, res) => {
  try {
    const users: UserAttributes[] = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({
      message: "Error getting users",
      details: error instanceof Error ? error.message : error,
    });
  }
});

router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.substring(7);
    if (!token) {
      return res.status(401).json({
        message: "Invalid token.",
      });
    }

    const decodedUser = jwt.verify(token, JWT_SECRET);
    if (
      typeof decodedUser !== "object" ||
      !decodedUser.id ||
      !decodedUser.username
    ) {
      return res.status(401).json({
        message: "Invalid token.",
      });
    }

    const user = await User.findByPk(decodedUser.id, {
      include: {
        model: Vote,
        as: "votes",
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Error getting users",
      details: error instanceof Error ? error.message : error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser: NewUser = await CreateUserSchema.parseAsync(req.body);

    const hashedPassword: string = await bcrypt.hash(newUser.password, 10);
    const { password: _, ...userWithoutPassword } = newUser;

    const user: UserAttributes = await User.create({
      ...userWithoutPassword,
      passwordHash: hashedPassword,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: "Error posting a user",
      details: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
