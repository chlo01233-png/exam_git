import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditForm.module.css';
import { getBoardDetail, updateBoardPost } from '../../api/boardApi'; // Assuming an updateBoardPost API function
import useAuthStore from '../../store/authStore';

const EditForm = () => {
  const { seq } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loginId = useAuthStore(state => state.loginId);



  const [updatePost, setUpdatePost] = useState({
    seq: seq,
    writer: loginId,
    title: "",
    contents: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatePost(prev => ({
      ...prev,
      seq: seq,
      writer: loginId,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getBoardDetail(seq);
        setTitle(response.data.title);
        setContent(response.data.contents);
        setUpdatePost(prev => ({
          ...prev,
          title: response.data.title,
          contents: response.data.contents
        }));    
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [seq]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await updateBoardPost(seq, { title, contents: content }); // Assuming update API takes seq and an object with title/contents
  //     alert('게시글이 성공적으로 수정되었습니다.');
  //     navigate(`/board/${seq}`);
  //   } catch (err) {
  //     alert('게시글 수정에 실패했습니다: ' + err.message);
  //     console.error("Update error:", err);
  //   }
  // };
  const handleUpdate = () => {
    updateBoardPost(seq, updatePost).then(resp => {
      console.log(resp);
      alert('게시글이 성공적으로 수정되었습니다.');
      navigate(`/board/${seq}`);
    }).catch(err => {
      alert('게시글 수정에 실패했습니다: ' + err.message);
      console.error("Update error:", err);
    });
  };  

  const handleCancel = () => {
    navigate(`/board/${seq}`);
  };

  if (loading) {
    return <div className={styles.editFormContainer}>게시글 불러오는 중...</div>;
  }

  if (error) {
    return <div className={styles.editFormContainer}>Error: {error.message}</div>;
  }

  return (
    <div className={styles.editFormContainer}>
      <h1 className={styles.editFormTitle}>게시글 수정</h1>
      
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.formLabel}>제목</label>
          <input
            type="text"
            name="title"
            className={styles.formInput}
            value={updatePost.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.formLabel}>내용</label>
          <textarea
            name="contents"
            className={styles.formTextarea}
            value={updatePost.contents}
            onChange={handleChange}
            rows="10"
            required
          ></textarea>
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" onClick={handleUpdate} className={styles.submitButton}>수정 완료</button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>취소</button>
        </div>
     
    </div>
  );
};

export default EditForm;
