import type { Request, Response } from "express";
import UserData from "../models/user.ts";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }
    const existingUser = await UserData.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "User already exists",
      });
    }

    const saltRounds = Number(process.env.SALT_ROUNDS);
    const salt = bcrypt.genSaltSync(saltRounds);


    const hash = bcrypt.hashSync(password, salt);
    const newUser = new UserData({ name, email, password: hash, phone });
    const savedUser = await newUser.save();
    res.status(200).json({
      status: true,
      message: "successfull",
      data: savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("enterd");
    
    const { email, password } = req.body;    
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    } else {
      const user = await UserData.findOne({ email: email });
      if (!user) {
        return res.status(401).json({
          status: false,
          message: "Invalid email or password",
        });
      } else {
        const isPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isPassword) {
          const token = jwt.sign(
            { userId: user._id, userEmail: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRY }
          );

          res.status(200).json({
            status: true,
            message: "successfull",
            data: null,
            result: user,
            access_token: token,
          });
        } else {
          return res.status(401).json({
            status: false,
            message: "Invalid email or password",
          });
        }
      }
    }
  } catch (err) {
    console.log("err");
  }
};
