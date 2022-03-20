export const REFERRALS_RESPONSE = ({
    createdAt="",
    campaign="",
    clicks=0,
    ref1="",
    ref2="",
    commission=0,
    conversion=0,
    id=""
}) => {
    return {
        date:createdAt,
        campaign,
        clicks,
        conversion,
        ref1,
        ref2,
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