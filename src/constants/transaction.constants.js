export const PENDING = "pending";
export const SUCCESS = "success";
export const FAILED = "failed";
export const T_AUTH_PENDING = (authType,data) => {
    return {
        status: PENDING,
        type:authType,
        data:{},
        msg:""
    }
}
export const T_AUTH_FAILED = (authType,message) => {
    return{
        status: FAILED,
        type:authType,
        data:{},
        msg:message
    }
}
export const T_AUTH_SUCCESS = (authType,data) => {
    return{
        status: SUCCESS,
        type:authType,
        data:data,
        msg:""
    }
}

export const REQUEST_PENDING = (data={}) => {
    return {
        status: PENDING,
        data:data,
        msg:""
    }
}
export const REQUEST_FAILED = (message,data={}) => {
    return{
        status: FAILED,
        data:data,
        msg:message
    }
}
export const REQUEST_SUCCESS = (data={}) => {
    return{
        status: SUCCESS,
        data:data,
        msg:""
    }
}