import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import User from "../../models/user";
import { BadRequestError, uploadImages } from "../../../common";
import fs from "fs";
import path from "path";

const router = Router();

router.post('/api/post/new', uploadImages, async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    if (!req.files) {
        return next(new BadRequestError('Images are required!'));
    }

    let images: Array<Express.Multer.File>;

    if (typeof req.files === 'object') {
        images = Object.values(req.files);
    } else {
        images = req.files ? [...req.files] : []
    }

    if (!title || !content) {
        return next(new BadRequestError('title end content are required!'));
    }

    const newPost = Post.build({
        title,
        content,
        images: images.map((file: Express.Multer.File) => {
            let buff = fs.readFileSync(path.join('uploads/' + file.filename));
            let srcObj = { src: `data:${file.mimetype};base64,${buff.toString('base64')}` };
            fs.unlink(path.join('uploads/' + file.filename), () => { });
            return srcObj;
        })
    });



    await newPost.save();

    await User.findOneAndUpdate({ _id: req.currentUser!.userId }, { $push: { posts: newPost._id } });

    res.status(200).send(newPost);
});

export {
    router as newPostRouter
};