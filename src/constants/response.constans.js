export const REFERRALS_RESPONSE = ({
    createdAt="",
    campaign="NULL",
    clicks=0,
    ref1="NULL",
    ref2="NULL",
    commission=0,
    conversion=0,
    id=""
}) => {
    return {
        date:createdAt,
        campaign,
        clicks,
        conversion,
        ref1: ref1?ref1:"NULL",
        ref2: ref2?ref2:"NULL",
        commission,
        id
    }
}

export const USER_STATUS_RESPONSE = ({
    displayName="",
    email="",
    createdAt="",
    value=0,
    paymentApproved=0,
    id=""
}) =>{
    return {
        displayName,
        email,
        createdAt,
        value,
        paymentApproved,
        id
    }
}