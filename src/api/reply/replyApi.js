import { maxios } from '../axiosApi';

export const getReplies = (bseq) => maxios.get(`/reply/${bseq}`);
export const postReply = (data) => maxios.post('/reply', data);
export const putReply = (data) => maxios.put(`/reply/${data.seq}`, data);
export const deleteReply = (seq) => maxios.delete(`/reply/${seq}`);
