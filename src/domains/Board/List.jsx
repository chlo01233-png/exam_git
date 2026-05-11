// import { useEffect, useState } from 'react';
// import styles from './Board.module.css';
// // import { getBoardList } from '../../api/signupFormApi';
// // import useLoadingStore from '../../store/loadingStore';
// import BarLoader from 'react-spinners/BarLoader';
// import { Link, useSearchParams } from "react-router-dom";
// import Pagination from '@mui/material/Pagination';

const List = () => {
//   const loading = useLoadingStore(state => state.loading);
//     const setLoading = useLoadingStore(state => state.setLoading);

    return (<div></div>)
}
//     const [ searchParam, setSearchParam ] = useSearchParams();

//     const currentPage = parseInt(searchParam.get("cpage")) || 1;


//     const [messages, setMessages] = useState([{
//         seq: "",
//         writer: "",
//         title: "",
//         content: "",
//         view_count: "",
//         write_date: ""
//     }]);

//     const [totalCount, setTotalCount] = useState();
//     const [totalPages, setTotalPages] = useState();
//     // const [currentPage, setCurrentPage] = useState(1);



//     // useEffect(() => {
//     //    // setLoading(true);
//     //     getBoardList(currentPage).then(resp => {
//     //         setMessages(resp.data.list);

//     //         setTotalCount(resp.data.totalCount);
//     //         setTotalPages(Math.ceil(resp.data.totalCount / 10));

//     //         setLoading(false);

//     //         console.log(resp.data.list);
//     //     })
//     // }, [currentPage])

//     return (

//         <>
//             {/* {loading && <div className={styles.loadingOverlay}>
//                 <BarLoader size={300} color="#ffde4a" speedMultiplier={1.5}></BarLoader>
//                 <p className={styles.loadingText}>데이터를 로딩 중입니다...</p>
//             </div>
//             } */}
//             <div className={styles.container}>
//                 <div className={styles.pageTitle}>회원게시판</div>
//                 <div className={styles.btns}>
//                     <Link to="/board/writeform"><button>글작성</button></Link>
//                     <Link to="/"><button>홈으로</button></Link>
//                 </div>
//                 <div className={styles.body}>
//                     <div className={styles.row}>
//                         <div className={styles.seq}>번호</div>
//                         <div className={styles.title}>제목</div>
//                         <div className={styles.writer}>작성자</div>
//                         <div className={styles.write_date}>작성일</div>
//                     </div>
//                     {messages.map((message, index) => {
//                         return (
//                             < div className={styles.row} key={index}>
//                                 <div className={styles.seq}>{message.seq}</div>
//                                 <div className={styles.title}><Link to={`/board/${message.seq}`}>{message.title}</Link></div>
//                                 <div className={styles.writer}>{message.writer}</div>
//                                 <div className={styles.write_date}>{message.write_date}</div>
//                             </div>

//                         );
//                     })

//                     }

//                     <div className={styles.footer}>
//                         <Pagination
//                             count={totalPages}
//                             page={currentPage}
//                             onChange={(e, page) => { setSearchParam({ cpage: page }) }}
//                             siblingCount={4}
//                             boundaryCount={0} />
//                     </div>
//                 </div>

//             </div >
//         </>
//     );
// };

export default List;
