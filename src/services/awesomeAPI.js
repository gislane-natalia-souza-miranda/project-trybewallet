// acesso à api
const awesomeapi = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrencies = () => (
  fetch(awesomeapi)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default fetchCurrencies;
