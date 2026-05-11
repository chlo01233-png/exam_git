import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WriteForm.module.css';

const WriteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log('Title:', title);
    console.log('Content:', content);
    alert('게시글이 작성되었습니다. (실제 기능은 구현되지 않음)');
    navigate('/board'); // Redirect to board list after submission
  };

  const handleCancel = () => {
    navigate('/board'); // Redirect to board list if canceled
  };

  return (
    <div className={styles.writeFormContainer}>
      <h1 className={styles.writeFormTitle}>새 게시글 작성</h1>
      <form onSubmit={handleSubmit} className={styles.writeForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.formLabel}>제목</label>
          <input
            type="text"
            id="title"
            className={styles.formInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.formLabel}>내용</label>
          <textarea
            id="content"
            className={styles.formTextarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            required
          ></textarea>
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>작성</button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default WriteForm;
