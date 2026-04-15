import { Router } from "express";
import bcrypt from 'bcrypt';

const router = Router();

import User, { UserAttributes } from "../models/User";
import { CreateUserSchema, NewUser } from "../schemas/user.schema";

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

router.post("/", async (req, res) => {
  try {
    const newUser: NewUser = await CreateUserSchema.parseAsync(req.body);

    const hashedPassword: string = await bcrypt.hash(newUser.password, 10);
    const { password, ...userWithoutPassword } = newUser;

    const user: UserAttributes = await User.create({...userWithoutPassword, passwordHash: hashedPassword});
    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: "Error posting a user",
      details: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
