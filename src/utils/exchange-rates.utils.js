import axios from "axios"

export const MYR = 'MYR';
export const SGD = 'SGD';
export const THB = 'THB';
export const IDR = 'IDR';

export const currencyList = [
  {
    iso:MYR,
    symbol:"RM"
  },
  {
    iso:SGD,
    symbol:"$"
  },{
    iso:THB,
    symbol:"฿"
  },{
    iso:IDR,
    symbol:"Rp"
  },
]


export const fetchExchangeRateFromMYRto = async (toCurrency) => {
    if(!toCurrency) throw new Error("to currency not provided")
    // if(toCurrency === MYR) return 1;

    const options = {
        method: 'GET',
        url: 'https://currency-exchange.p.rapidapi.com/exchange',
        params: {to: toCurrency, from: 'MYR', q: '1.0'},
        headers: {
          'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
          'X-RapidAPI-Key': 'ddabc266ddmsh743ff06a57befa5p149564jsn8f8f30b0f9bc'
        }
      };
    const response = await axios.request(options);
    if(!response || !response.data) throw new Error("can't fetch exhange rate") 
    return response.data;
}

