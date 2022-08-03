// acesso à api
const awesomeapi = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrencies = async () => {
  const response = await fetch(awesomeapi);
  const data = await response.json(); // data é um objeto
  const currencies = Object.keys(data); // array de currencies
  return currencies.filter((currency) => currency !== 'USDT'); // array de currencies sem USDT
};

export const fetchExchangeRates = async () => {
  const response = await fetch(awesomeapi);
  const exchangeRates = await response.json(); // exchangeRates é um objeto
  return exchangeRates;
};
