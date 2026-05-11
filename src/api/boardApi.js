import { maxios } from './axiosApi';


export const getBoardDetail = (seq) => maxios.get(`/board/${seq}`);
export const getBoardList = (cpage) => maxios.get(`/board/list`, {params: {cpage:cpage}});
export const addPost = (post) => maxios.post(`/board/write`, post);
export const deleteBoardPost = (seq) => maxios.delete(`/board/${seq}`);
export const updateBoardPost = (seq, postData) => maxios.put(`/board/edit/${seq}`, postData);