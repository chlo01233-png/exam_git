import React, { useState, useEffect } from 'react';
import Reply from './Reply';
import styles from './ReplyList.module.css';
import { getReplies, deleteReply } from '../../../api/reply/replyApi';

const ReplyList = ({ parent_seq = 7 }) => {
  // 상태 변수: 댓글 목록, 입력창 텍스트, 데이터 갱신용 트리거
  const [replies, setReplies] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [refresh, setRefresh] = useState(false);

  // 마운트 시 또는 부모번호/갱신상태 변경 시 데이터 조회
  useEffect(() => {
    getReplies(parent_seq).then(res => setReplies(res.data));
  }, [parent_seq, refresh]);

  // 댓글 삭제: API 호출 성공 후 refresh 상태를 반전시켜 목록 재조회
  const handleDelete = (seq) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteReply(seq).then(() => setRefresh(!refresh));
    }
  };

  return (
    <div className={styles.listContainer}>
      {/* 댓글 헤더 영역 */}
      <div className={styles.titleSection}>
        <h3 className={styles.title}>댓글</h3>
        <span className={styles.count}>{replies.length}개</span>
      </div>

      {/* 댓글 작성 입력 영역 */}
      <div className={styles.inputSection}>
        <div className={styles.inputAvatar}>M</div>
        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            className={styles.commentInput} 
            placeholder="댓글 추가..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {/* 입력 내용이 있을 때만 취소/등록 버튼 표시 */}
          {newComment && (
            <div className={styles.inputActions}>
              <button className={styles.cancelBtn} onClick={() => setNewComment('')}>취소</button>
              <button className={`${styles.submitBtn} ${styles.active}`}>댓글</button>
            </div>
          )}
        </div>
      </div>

      {/* 댓글 목록 출력 영역: 삼항 연산자로 데이터 유무에 따른 화면 분기 */}
      <div className={styles.listWrapper}>
        {replies && replies.length > 0 ? (
          replies.map((reply) => (
            <Reply
              key={reply.seq}
              writer={reply.writer}
              contents={reply.contents}
              write_date={reply.write_date}
              onDelete={() => handleDelete(reply.seq)}
            />
          ))
        ) : (
          <div className={styles.empty}>등록된 댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};
export default ReplyList;
