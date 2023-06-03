import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import { BadRequestError } from "../../../common";

const router = Router();

router.get('/api/post/show/:id?', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let allPosts;
    let post;

    if (!id) {
        try {
            allPosts = await Post.find().populate('comments');
        } catch (err) {
            return next(new BadRequestError('Post could not be found!'));
        }

        return res.status(200).send(allPosts);
    }

    try {
        post = await Post.findOne({ _id: id }).populate('comments');
    } catch (err) {
        return next(new BadRequestError('Post could not be found!'));
    }

    res.status(200).send(post)
});

export {
    router as showPostRouter
};