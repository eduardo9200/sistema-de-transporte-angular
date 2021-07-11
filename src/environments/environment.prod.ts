declare var require: any;

const BASE_URL = `http://localhost:8080`;

export const environment = {
  production: true,
  urlSistemaTransporteApi: BASE_URL,
  VERSION: require('../../package.json').version
};
