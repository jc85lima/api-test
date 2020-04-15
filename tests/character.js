const chai = require('chai');
const { expect } = chai.use(require('chai-json-schema'));

const { request } = require('../support/request');
const characterSchema = require('../resources/character.schema.json');

describe('GET - /v1/public/characters/{characterId}', async () => {
  describe('Validar Status Code da resposta', async () => {
    it('Dever ser 200 quando buscar um personagem por um characterId existente e válido', async () => {
      const response = await request.get('/v1/public/characters/1011334');
      expect(response.status).to.be.equal(200);
    });
    it('Dever ser 404 quando buscar um personagem por um characterId inexistente e válido', async () => {
      const response = await request.get('/v1/public/characters/000');
      expect(response.status).to.be.equal(404);
    });
    it('Dever ser 404 quando buscar um personagem sem informar characterId na requisição', async () => {
      const response = await request.get('/v1/public/characters/');
      expect(response.status).to.be.equal(404);
    });
    it('Dever ser 404 quando buscar um personagem por um characterId com do tipo inválido', async () => {
      const response = await request.get('/v1/public/characters/not-int');
      expect(response.status).to.be.equal(404);
    });
  });
  describe('Validar schema da resposta', async () => {
    it('Deve possuir o schema ../resouces/character.schema.json quando buscar por um characterId existente e válido', async () => {
      const response = await request.get('/v1/public/characters/1011334');
      expect(response.data).to.be.jsonSchema(characterSchema);
    });
  });
  describe('Validar informações retornadas do personagem', async () => {
    it('Deve possuir o atributo com valor "copyright": "© 2020 MARVEL"', async () => {
      const response = await request.get('/v1/public/characters/1011334');
      expect(response.data.copyright).to.be.equal('© 2020 MARVEL');
    });
  });
});
