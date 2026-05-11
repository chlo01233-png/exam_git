import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Detail.module.css';
import { getBoardDetail, deleteBoardPost } from '../../api/boardApi'; // Import deleteBoardPost
import useAuthStore from '../../store/authStore'; // Import useAuthStore
import ReplyList from './reply/ReplyList'; // Import ReplyList



const Detail = () => {

  const { seq } = useParams();

  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loginId } = useAuthStore(); // Get loginId from auth store

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

  const handleEdit = () => {
    navigate(`/board/edit/${post.seq}`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteBoardPost(post.seq); // Call delete API
        alert("게시글이 삭제되었습니다.");
        navigate('/board/list'); // Redirect to board list
      } catch (err) {
        alert("게시글 삭제에 실패했습니다: " + err.message);
        console.error("Delete error:", err);
      }
    }
  };

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
        {loginId === post.writer && (
          <>
            <button className={styles.editButton} onClick={handleEdit}>수정</button>
            <button className={styles.deleteButton} onClick={handleDelete}>삭제</button>
          </>
        )}
      </div>
      <ReplyList boardSeq={seq} /> {/* Render ReplyList and pass boardSeq prop */}
    </div>
  );
};

export default Detail;
