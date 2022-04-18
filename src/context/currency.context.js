import { createContext,useState } from "react";
import { PENDING, REQUEST_PENDING, REQUEST_SUCCESS } from "../constants/transaction.constants";
import { MYR } from "../utils/exchange-rates.utils";
// import { _isNotEmpty } from "../utils/validations.utils.js"

export const CurrencyContext = createContext({
    currentCurrency: REQUEST_PENDING(),
    setCurrentCurrency:() => null
})

export const CurrencyProvider = ({children}) => {
    const [currentCurrency, setCurrentCurrency] = useState( REQUEST_SUCCESS({
        iso:MYR,
        symbol:"RM",
        rate:1
      })) 
    const calculateExchangeRateStr = (baseCurrency,withISO=false) => {
        if(currentCurrency.status===PENDING) return ""; 
        const value = Math.round(baseCurrency * currentCurrency.data.rate * 100) / 100
        if(withISO) return `${currentCurrency.data.iso} ${value}`
        return `${currentCurrency.data.symbol} ${value}`
    }
    const value = {currentCurrency, setCurrentCurrency,calculateExchangeRateStr};

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    )
}