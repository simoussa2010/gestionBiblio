//tests/livresController.test.js
import request from 'supertest';
import express from 'express';
import livresRouter from '../routes/livres.js';



const app = express();
app.use(express.json());
app.use('/gestionbiblio/livres', livresRouter);

describe('Livres Controller', () => {
    it('GET /gestionbiblio/livres/:id - should return livres', async () => {
        const res = await request(app).get('/gestionbiblio/livres');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('POST /gestionbiblio/livres - should create a livre', async () => {
        const res = await request(app).post('/gestionbiblio/livres').send({
            name: 'Group A',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Group A');
    });

    it('PUT /gestionbiblio/livres/:id - should update a group', async () => {
        const livreRes = await request(app).post('/gestionbiblio/livres').send({
            name: 'Group A',
        });

        const updatedLivre = {
            name: 'Group B'
        };

        const res = await request(app).put(`/gestionbiblio/livres/${livreRes.body.id}`).send(updatedLivre);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Livre B');
    });

    it('DELETE /gestionbiblio/livres/:id - should delete a livre', async () => {
        const livreRes = await request(app).post('/gestionbiblio/livres').send({
            name: 'Livre A',
        });

        const res = await request(app).delete(`/gestionbiblio/livres/${livreRes.body.id}`);
        expect(res.statusCode).toEqual(204);

        const getRes = await request(app).get(`/gestionbiblio/livres/${livreRes.body.id}`);
        expect(getRes.statusCode).toEqual(404);
    });
});