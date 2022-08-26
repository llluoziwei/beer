const BASE_URL = "http://192.168.1.60:8089";
const PRIDE = "/mes/pride-mes-core";
const proxy = "/api";
const MES = "/mes/pride-mes-system-tangr";

const UPLOAD = "http://localhost:8081/upload";

module.exports = {
  edition: 100, //软件版本号  打包时 需要与设置里 版本号一致

  // login: BASE_URL + PRIDE
  login: BASE_URL + MES,
  upload: UPLOAD,
};
