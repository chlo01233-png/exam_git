import { maxios } from "../../api/axiosApi";

export const idCk = (id) => maxios.get(`/members/idCk/${id}`)
export const signup = (data) => maxios.post(`/members`,data)



export const signin = (data) => maxios.post(`/auth`,data)