import { Router } from "express";
import bcrypt from "bcrypt";
import { LoginInfo, LoginSchema } from "../schemas/user.schema";
import { User } from "../models";
import { TokenUser } from "../types";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const loginInfo: LoginInfo = await LoginSchema.parseAsync(req.body);

    const user = await User.findOne({
      where: { username: loginInfo.username },
    });

    if (!user) {
      console.log("Username");
      return res.status(404).json({
        message: "User with this username was not found.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginInfo.password,
      user.passwordHash,
    );
    if (!isPasswordCorrect) {
      console.log("Password");
      return res.status(404).json({
        message: "Invalid credentials.",
      });
    }

    const tokenUser: TokenUser = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(tokenUser, JWT_SECRET);
    res.status(200).json({
      username: tokenUser.username,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Authorization error",
      details: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
