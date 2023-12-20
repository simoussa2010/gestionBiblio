//tests/contactsController.test.js
import request from 'supertest';
import express from 'express';
import contactsRouter from '../routes/contacts.js';



const app = express();
app.use(express.json());
app.use('/api/contacts', contactsRouter);




describe('Helmet headers', () => {
  it('should include security headers', async () => {
    const response = await request(app).get('/');
    expect(response.headers['content-security-policy']).toBeDefined();
    // Add expectations for other Helmet headers
  });
});

// ... (autres imports et configuration)

describe('Rate Limiting', () => {
    it('should block requests over the rate limit', async () => {
      // On effectue un nombre de requêtes égal à la limite.
      for (let i = 0; i < 109; i++) {
        await request(app).get('/api/contacts');
      }
  
      // La requête qui dépasse la limite devrait être bloquée.
      const response = await request(app).get('/api/contacts');
      expect(response.statusCode).toEqual(429); // 429 est le code de statut pour "Too Many Requests"
      expect(response.body).toEqual(expect.anything()); // Vous pouvez également tester le corps de la réponse si nécessaire.
    });
  
    // Vous pouvez également ajouter une temporisation pour tester le réinitialisation de la limite
    // mais cela impliquerait d'attendre l'expiration de windowMs, ce qui n'est pas pratique pour un test unitaire.
  });
  


describe('Contacts Controller', () => {
    it('GET /api/contacts - should return all contacts', async () => {
        const res = await request(app).get('/api/contacts');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('POST /api/contacts - should create a contact', async () => {
        const res = await request(app).post('/api/contacts').send({
            name: 'John Doe',
            email: 'john.doe@example.com'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('John Doe');
    });

    it('PUT /api/contacts/:id - should update a contact', async () => {
        const contactRes = await request(app).post('/api/contacts').send({
            name: 'John Doe',
            email: 'john.doe@example.com'
        });

        const updatedContact = {
            name: 'Jane Doe',
            email: 'jane.doe@example.com'
        };

        const res = await request(app).put(`/api/contacts/${contactRes.body.id}`).send(updatedContact);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Jane Doe');
    });

    it('DELETE /api/contacts/:id - should delete a contact', async () => {
        const contactRes = await request(app).post('/api/contacts').send({
            name: 'John Doe',
            email: 'john.doe@example.com'
        });

        const res = await request(app).delete(`/api/contacts/${contactRes.body.id}`);
        expect(res.statusCode).toEqual(204);

        const getRes = await request(app).get(`/api/contacts/${contactRes.body.id}`);
        expect(getRes.statusCode).toEqual(404);
    });
});