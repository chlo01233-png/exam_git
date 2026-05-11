import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Detail.module.css';
import { getBoardDetail } from '../../api/boardApi';



const Detail = () => {

  const { seq } = useParams();

  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response =  await getBoardDetail(seq); // Use the imported API function
        setPost(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [seq]);

  if (loading) {
    return <div className={styles.detailContainer}>Loading post details...</div>;
  }

  if (error) {
    return <div className={styles.detailContainer}>Error: {error.message}</div>;
  }

  if (!post) {
    return <div className={styles.detailContainer}>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.detailTitle}>{post.title}</h1>
      <div className={styles.detailMeta}>
        <span>작성자: {post.writer}</span>
        <span>작성일: {post.write_date}</span>
        <span>조회수: {post.view_count}</span>
      </div>
      <div className={styles.detailContent}>
        <p>{post.contents}</p>
      </div>
      <div className={styles.detailActions}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>목록으로</button>
        {/* Add Edit/Delete buttons here if needed */}
      </div>
    </div>
  );
};

export default Detail;
