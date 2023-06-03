import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import User, { UserDoc } from "../../models/user";
import { BadRequestError } from "../../../common";

const router = Router();

router.delete('/api/post/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
        return next(new BadRequestError('Post id is required!'));
    }

    let user: UserDoc | null;

    try {
        await Post.findOneAndRemove({ _id: id })
        user = await User.findOneAndUpdate({ _id: req.currentUser!.userId }, { $pull: { posts: id } }, { new: true });
    } catch (err) {
        return next(new BadRequestError('Post could not be deleted!'));
    }

    res.status(200).send(user);
});

export {
    router as deletePostRouter
};