import axios from 'axios';

const loginuser = (data)  =>{
    return axios.post('http://127.0.0.1:8080/api/v1/user/login', data)

}



const AuthServices = {loginuser}

export default AuthServices;