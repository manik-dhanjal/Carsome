export const CLICKS_CALCULATOR = (arr) =>{
    return arr.reduce((total,current) => {
        return total + parseInt(current.clicks);
    },0)
}

export const CONVERSION_CALCULATOR = (arr) =>{
    return arr.reduce((total,current) => {
        return total + parseInt(current.conversion);
    },0)
}

export const CONVERSION_RATE_CALCULATOR = (arr) =>{

    const {conversion,click} = arr.reduce((total,current) => {
        return {
            conversion: total.conversion + parseInt(current.conversion),
            click: total.click + parseInt(current.clicks)
        }
    },{conversion:0,click:0})
    if(!click) return 0;
    return ((conversion/click)*100).toFixed(2)
}
export const COMMISSION_RATE_CALCULATOR = (arr) =>{

    return arr.reduce((total,current) => {
        return total + parseInt(current.commission);
    },0)
}