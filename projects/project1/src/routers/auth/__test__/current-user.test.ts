import request from 'supertest';
import { app } from '../../../app';

it('Should return the currentUser property', async () => {
    const cookie = await global.signin();

    const res = await request(app)
        .get('/current-user')
        .set('Cookie', cookie)
        .send()
        .expect(200)

    expect(res.body.currentUser.email).toEqual('test@test.com');
})