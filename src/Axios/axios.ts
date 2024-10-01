import axios from "axios";

 export const axiosInstance=axios.create({
baseURL:"https://social-media-rest-apis.onrender.com/"
})
axiosInstance.interceptors.response.use((response)=>{
    return response
},(error)=>{
    return Promise.reject(error)
})
