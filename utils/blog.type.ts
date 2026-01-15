import { Types } from "mongoose";

export interface BlogType {
  title: string;
  description: string;
  category: string;
  user: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
