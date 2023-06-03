import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import supertest from 'supertest';

declare global {
    var signin: () => Promise<string[]>;
};


let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'abacaxi';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    mongo = await MongoMemoryServer.create();
    let mongoUri = await mongo.getUri();
    console.log(mongoUri);


    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {

    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async () => {
    const res = await supertest(app).post('/signup').send({
        email: 'test@test.com',
        password: 'test123'
    }).expect(201);

    const cookie = res.get('Set-Cookie');

    return cookie;
}