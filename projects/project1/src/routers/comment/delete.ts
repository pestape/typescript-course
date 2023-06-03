import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import Comment from "../../models/comment";
import { BadRequestError } from "../../../common";

const router = Router();

router.delete('/api/comment/:commentId/delete/:postId', async (req: Request, res: Response, next: NextFunction) => {
    const { commentId, postId } = req.params;

    if (!commentId || !postId) {
        return next(new BadRequestError('Comment id and post id is required!'));
    }

    try {
        await Comment.findOneAndRemove({ _id: commentId });
    } catch (err) {
        return next(new BadRequestError('Comment could not be deleted!'));
    }

    let post;

    try {
        post = await Post.findOneAndUpdate({ _id: postId }, { $pull: { comments: commentId } }, { new: true });
    } catch (err) {
        return next(new BadRequestError('Post could not be updated!'));
    }

    res.status(200).send(post);
});

export {
    router as deleteCommentRouter
};