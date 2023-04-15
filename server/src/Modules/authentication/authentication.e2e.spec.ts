import request from 'supertest';
import Server from "../../server";

describe('auth', () => {
    beforeAll(() => {
        return Server.init();
    });

    it('POST /api/auth/login', async () => {
        const response = await request(Server.getApp().app)
            .post(`/api/auth/login`)
            .expect(200);
        
    });

    it('PUT /api/auth/forgot-password', async () => {
        const response = await request(Server.getApp().app)
            .put(`/api/auth/forgot-password`)
            .expect(200);
    });

    afterAll(() => {
        return Server.close();
    });
});
