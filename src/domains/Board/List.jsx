import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './List.module.css';
import { maxios } from '../../api/axiosApi';

const List = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await maxios.get('/board/list'); // API endpoint for board list
        setPosts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
      <div className={styles.pagination}>
        {/* Pagination will be implemented later if needed */}
        <button className={styles.pageButton}>&laquo;</button>
        <button className={styles.pageButton}>&lsaquo;</button>
        <button className={`${styles.pageButton} ${styles.active}`}>1</button>
        <button className={styles.pageButton}>2</button>
        <button className={styles.pageButton}>3</button>
        <button className={styles.pageButton}>&rsaquo;</button>
        <button className={styles.pageButton}>&raquo;</button>
      </div>
    </div>
  );
};

export default List;
