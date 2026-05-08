import { maxios } from '../axiosApi';

export const getReplies = (boardSeq) => maxios.get(`/replies/board/${boardSeq}`);
export const postReply = (replyData) => maxios.post('/replies', replyData);
export const putReply = (replyData) => maxios.put(`/replies/${replyData.seq}`, replyData);
export const deleteReply = (seq) => maxios.delete(`/replies/${seq}`);
