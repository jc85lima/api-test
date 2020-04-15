const axios = require('axios');
const crypto = require('crypto');

const { PUBLIC_KEY, PRIVATE_KEY } = process.env;
if (PUBLIC_KEY === undefined || PRIVATE_KEY === undefined) {
  throw new Error('PUBLIC_KEY e PRIVATE_KEY são parâmetros obrigatórios para execução do teste.');
}

const TS = 11;
const HASH = crypto.createHash('md5').update(TS + PRIVATE_KEY + PUBLIC_KEY).digest('hex');

const instance = axios.create({
  baseURL: process.env.HOST || 'http://gateway.marvel.com',
  validateStatus: false,
  params: { apikey: PUBLIC_KEY, ts: TS, hash: HASH },
});

instance.interceptors.request.use((config) => {
  const newConfig = config;
  if (newConfig.params === undefined) newConfig.params = {};
  newConfig.params.apikey = PUBLIC_KEY;
  newConfig.params.ts = TS;
  newConfig.params.hash = HASH;
  return newConfig;
});

module.exports = { request: instance };
