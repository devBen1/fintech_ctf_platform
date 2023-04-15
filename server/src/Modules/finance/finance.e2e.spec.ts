import request from 'supertest';
import Server from "../../server";

describe('finance', () => {
    beforeAll(() => {
        return Server.init();
    });

    it('POST /api/finance/send-money', async () => {
        
    });

    afterAll(() => {
        return Server.close();
    });
});
