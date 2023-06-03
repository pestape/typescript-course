
import mongoose from 'mongoose';
import {app} from './app';

const start = async () => {
    if (!process.env.MONGO_URI) { throw new Error('MONGO_URI is required!'); }
    if (!process.env.JWT_KEY) { throw new Error('JWT_KEY is required!'); }
    if (!process.env.PORT) { throw new Error('PORT is required!'); }

    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log(error);

        throw new Error('Database error');
    }

    app.listen(process.env.PORT, () => {
        console.log(`Server is up and running on port ${process.env.PORT}`);
    });
};

start();


