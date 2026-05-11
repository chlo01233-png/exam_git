import { maxios } from './axiosApi';


export const getBoardDetail = (seq) => maxios.get(`/board/${seq}`);
export const getBoardList = (cpage) => maxios.get(`/board/list`, {params: {cpage:cpage}});