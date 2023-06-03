import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import { BadRequestError } from "../../../common";

const router = Router();

router.post('/api/post/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { content, title } = req.body;
    let updatedPost;

    if (!id) {
        return next(new BadRequestError('post id is required!'));
    }

    try {
        updatedPost = await Post.findOneAndUpdate(
            { _id: id },
            { $set: { title, content } },
            { new: true }
        );
    } catch (err) {
        return next(new BadRequestError('post could not be updated!'));
    }

    res.status(200).send(updatedPost);
});

export {
    router as updatePostRouter
};