// acesso à api
const awesomeapi = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrencies = async () => {
  const response = await fetch(awesomeapi);
  const data = await response.json(); // data é um objeto
  const currencies = Object.keys(data); // array de currencies
  return currencies.filter((currency) => currency !== 'USDT'); // array de currencies sem USDT
};

export default fetchCurrencies;
