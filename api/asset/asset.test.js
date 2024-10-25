import request from 'supertest';
import {describe, it, expect} from 'vitest';
import app from '../../app';

describe('POST /api/assets', () => {
    it('should create a new asset', async () => {
        const newAsset = {
            name: 'New Asset',
            price: 200,
            slug: 'new-asset',
            image: 'https://via.placeholder.com/150',
            tokenAssetAddress: 'BW7AjDhWJmdH7fsf8s7UkSaYm5CtvmUDjm5V7xy4jakh',
        };
        const response = await request(app).post('/api/assets').send(newAsset);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'New Asset');
    });
});

describe('DELETE /api/assets', () => {
    it('should delete an asset', async () => {
        const response = await request(app).delete('/api/assets/1');
        expect(response.status).toBe(204);
    });
});

