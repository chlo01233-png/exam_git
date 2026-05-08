import React from 'react';
import styles from './List.module.css';

const List = () => {
  // Dummy data for the board list
  const posts = [
    { id: 1, title: '첫 번째 게시글입니다.', author: 'User1', date: '2026-05-08', views: 123 },
    { id: 2, title: '두 번째 게시글입니다.', author: 'User2', date: '2026-05-07', views: 45 },
    { id: 3, title: '세 번째 게시글입니다.', author: 'User3', date: '2026-05-06', views: 88 },
    { id: 4, title: '네 번째 게시글입니다.', author: 'User4', date: '2026-05-05', views: 201 },
  ];

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
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td><a href={`/board/${post.id}`} className={styles.postLink}>{post.title}</a></td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
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
