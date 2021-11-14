const axios = require('axios');
const cheerio = require('cheerio');
/*
const getHtml = async () => {
  try {
    return await axios.get(
      'https://finance.naver.com/sise/sise_index.naver?code=KOSPI',
    );
  } catch (error) {
    console.error(error);
  }
};
*/

async function getStockIndex() {
  try {
    const response = await axios.get(
      'https://finance.naver.com/sise/sise_index.naver?code=KOSPI',
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
