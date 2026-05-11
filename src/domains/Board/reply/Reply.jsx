import React, { useState } from 'react';
import styles from './Reply.module.css';
import { putReply } from '../../../api/reply/replyApi';

const Reply = ({ seq, loginId, writer, contents, write_date, onDelete, onUpdate }) => {
  // 수정 모드 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [editContents, setEditContents] = useState(contents);

  const avatarLabel = writer ? writer[0].toUpperCase() : '익';

  // 수정 취소
  const handleCancel = () => {
    setIsEditing(false);
    setEditContents(contents);
  };

  // 수정 저장
  const handleSave = () => {
    if (!editContents.trim()) return alert('내용을 입력해주세요.');
    
    const data = {
      seq: seq,
      contents: editContents
    };

    putReply(data).then(() => {
      setIsEditing(false);
      onUpdate(); // 부모 컴포넌트 목록 새로고침
    }).catch(err => alert('수정 실패'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>{avatarLabel}</div>
      
      <div className={styles.main}>
        <div className={styles.header}>
          <span className={styles.writer}>{writer}</span>
          <span className={styles.date}>{write_date}</span>
        </div>

        {/* 수정 모드 여부에 따른 렌더링 분기 */}
        {isEditing ? (
          <div className={styles.editWrapper}>
            <textarea 
              className={styles.editTextarea}
              value={editContents}
              onChange={(e) => setEditContents(e.target.value)}
              autoFocus
            />
            <div className={styles.editActions}>
              <button className={styles.cancelBtn} onClick={handleCancel}>취소</button>
              <button className={styles.saveBtn} onClick={handleSave}>저장</button>
            </div>
          </div>
        ) : (
          <div className={styles.content}>{contents}</div>
        )}

        <div className={styles.actions}>
          {!isEditing && (
            <>
              <button className={styles.actionBtn}>좋아요</button>
              
              {loginId === writer && (
                <>
                  <button 
                    className={styles.actionBtn} 
                    onClick={() => setIsEditing(true)}
                  >
                    수정
                  </button>
                  <button 
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={onDelete}
                  >
                    삭제
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
