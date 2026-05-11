import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WriteForm.module.css';
import useAuthStore from '../../store/authStore';
import { addPost } from '../../api/boardApi';

const WriteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const loginId = useAuthStore(state => state.loginId);

  const [newPost, setNewPost] = useState({
    writer: loginId,
    title: "",
    contents: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      writer: loginId,
      [name]: value
    }))
  }



  const navigate = useNavigate();




  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you would typically send the data to an API
  //   console.log('Title:', title);
  //   console.log('Content:', content);
  //   alert('게시글이 작성되었습니다. (실제 기능은 구현되지 않음)');
  //   navigate('/board/list'); // Redirect to board list after submission
  // };

  const handleCancel = () => {
    navigate('/board/list'); // Redirect to board list if canceled
  };

  const handleWrite = () => {
    addPost(newPost).then(resp => {
      console.log(resp);
      alert("게시글이 작성되었습니다.");
      navigate('/board/list');
    }).catch(err => {
      console.log(err);
      alert("게시글 작성에 실패했습니다.");
    })
  };

  return (
    <div className={styles.writeFormContainer}>
      <h1 className={styles.writeFormTitle}>새 게시글 작성</h1>

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.formLabel}>제목</label>
        <input
          type="text"
          name="title"
          className={styles.formInput}
          value={newPost.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.formLabel}>내용</label>
        <textarea
          name="contents"
          className={styles.formTextarea}
          value={newPost.contents}
          onChange={handleChange}
          rows="10"
          required
        ></textarea>
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" onClick={handleWrite} className={styles.submitButton}>작성</button>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>취소</button>
      </div>

    </div>
  );
};

export default WriteForm;
