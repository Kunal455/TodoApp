export function errorMessages(error){
    const mess = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return mess;
}