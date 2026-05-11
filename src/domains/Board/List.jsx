
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './List.module.css';
import Pagination from '@mui/material/Pagination';
import { getBoardList } from '../../api/boardApi';

const List = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParam, setSearchParam] = useSearchParams();

  const currentPage = parseInt(searchParam.get("cpage")) || 1;


  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBoardList(currentPage); // API endpoint for board list
        setPosts(response.data.list);


        setTotalCount(response.data.totalCount);
        setTotalPages(Math.ceil(response.data.totalCount / 10));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);


  if (loading) {
    return <div className={styles.boardContainer}>Loading posts...</div>;
  }

  if (error) {
    return <div className={styles.boardContainer}>Error: {error.message}</div>;
  }

  return (
    <div className={styles.boardContainer}>
      <h1 className={styles.boardTitle}>게시판</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.boardTable}>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.seq}>
                  <td>{post.seq}</td>
                  <td>
                    <Link to={`/board/${post.seq}`} className={styles.postLink}>
                      {post.title}
                    </Link>
                  </td>
                  <td>{post.writer}</td>
                  <td>{post.write_date}</td>
                  <td>{post.view_count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">게시글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/board/write" className={styles.writeButton}>글쓰기</Link>
      </div>
      <div className={styles.pagination}>

        <div className={styles.footer}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => { setSearchParam({ cpage: page }) }}
            siblingCount={4}
            boundaryCount={0} />
        </div>
      </div>
    </div>
  );
};


export default List;
