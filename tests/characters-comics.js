const chai = require('chai');
const { expect } = chai.use(require('chai-json-schema'));

const { request } = require('../support/request');
const characterSchema = require('../resources/character-comics.schema.json');

describe('GET - /v1/public/characters/{characterId}/comics', async () => {
  describe('Validar Status Code da resposta', async () => {
    it('Dever ser 200 quando buscar por um characterId existente e válido', async () => {
      const response = await request.get('/v1/public/characters/1011334/comics');
      expect(response.status).to.be.equal(200);
    });
    it('Dever ser 404 quando buscar os quadrinhos por um characterId inexistente e válido', async () => {
      const response = await request.get('/v1/public/characters/000/comics');
      expect(response.status).to.be.equal(404);
    });
    it('Dever ser 404 quando buscar os quadrinhos sem informar characterId na requisição', async () => {
      const response = await request.get('/v1/public/characters//comics');
      expect(response.status).to.be.equal(404);
    });
    it('Dever ser 409 quando buscar os quadrinhos por um characterId com do tipo inválido', async () => {
      const response = await request.get('/v1/public/characters/not-int/comics');
      expect(response.status).to.be.equal(409);
    });
    it('Dever ser 409 quando buscar os quadrinhos por um personagem informando um limit inválido (maior que 100)', async () => {
      const response = await request.get('/v1/public/characters/1011334/comics', { params: { limit: 101 } });
      expect(response.status).to.be.equal(409);
    });
    it('Dever ser 409 quando buscar os quadrinhos por um personagem informando um limit inválido (menor que 1)', async () => {
      const response = await request.get('/v1/public/characters/1011334/comics', { params: { limit: 0 } });
      expect(response.status).to.be.equal(409);
    });
    it('Dever ser 409 quando buscar os quadrinhos por um personagem informando um limit inválido (tipo diferente de inteiro)', async () => {
      const response = await request.get('/v1/public/characters/1011334/comics', { params: { limit: 'string' } });
      expect(response.status).to.be.equal(409);
    });
    it('Dever ser 200 quando buscar os quadrinhos por um personagem informando um limit válido (limite menor: 1)', async () => {
      const response = await request.get('/v1/public/characters/1011334/comics', { params: { limit: 1 } });
      expect(response.status).to.be.equal(200);
    });
    it('Dever ser 200 quando buscar os quadrinhos por um personagem informando um limit válido (limite maior: 100)', async () => {
      const response = await request.get('/v1/public/characters/1011334/comics', { params: { limit: 100 } });
      expect(response.status).to.be.equal(200);
    });
  });
  describe('Validar schema da resposta', async () => {
    it('Deve possuir o schema ../resources/character-comics.schema.json quando buscar por um characterId existente e válido', async () => {
      const response = await request.get('/v1/public/characters/1011334/comics');
      expect(response.data).to.be.jsonSchema(characterSchema);
    });
  });
  describe('Validar informações retornadas dos quadrinhos do personagem', async () => {
    it('Deve possuir o atributo com valor "copyright": "© 2020 MARVEL"', async () => {
      const response = await request.get('/v1/public/characters/1011334/comics');
      expect(response.data.copyright).to.be.equal('© 2020 MARVEL');
    });
  });
});
