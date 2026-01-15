import Blog from "../models/blog.ts";
import type { Request, Response } from "express";
import type { BlogType } from "../utils/blog.type";

export const addBlog = async (req: any, res: Response) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        status: false,
        message: "Title and category are required",
      });
    }

    const blog = await Blog.create({
      title,
      description,
      category,
      user: req.userDetails.userId,
    });

    res.status(201).json({
      status: true,
      message: "Blog added successfully",
      data: blog,
    });
  } catch (err) {
    console.error("Add Blog Error:", err);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// getBlog
export const getBlog = async (req: Request, res: Response) => {
  try {
    const { title, category } = req.query;

    const filter: any = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const listBlog = await Blog.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Blogs fetched successfully",
      data: listBlog,
    });
  } catch (error) {
    console.error("Get Blog Error:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) {
      console.log("id is required");
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      console.log("blog not found");
    } else {
      res.status(200).json({
        status: false,
        message: "blog fetched successfully",
        data: blog,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id, title, description, category } = req.body;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Blog ID is required",
      });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const updateData: Partial<BlogType> = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one field is required to update",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "blog ID is required" });
    }
    const deleteBlog = await Blog.findByIdAndDelete(id);
    if (!deleteBlog) {
      return res
        .status(404)
        .json({ status: false, message: "blog not found" });
    }else{
        res.status(200).json({
            status: true,
            message: "deleted",
            data: deleteBlog
        })
    }
  } catch (err) {
    console.log(err);
  }
};
