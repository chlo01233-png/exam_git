import React from 'react';
import styles from './Reply.module.css';

const Reply = ({ writer, contents, write_date, onDelete }) => {

  return (
    <div className={styles.container}>
      
      <div className={styles.main}>
        <div className={styles.header}>
          <span className={styles.writer}>{writer}</span>
          <span className={styles.date}>{write_date}</span>
        </div>

        <div className={styles.content}>{contents}</div>

        <div className={styles.actions}>
          <button className={styles.actionBtn}>좋아요</button>
          {/* <button className={styles.actionBtn}>답글</button> */}
          {onDelete && (
            <button 
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              onClick={onDelete}
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
