import React, { useState, useEffect } from 'react';
import Reply from './Reply';
import styles from './ReplyList.module.css';
import { getReplies, deleteReply, postReply } from '../../../api/reply/replyApi';
import useAuthStore from '../../../store/authStore';

const ReplyList = ({ parent_seq = 7 }) => {
  // 상태 변수 및 스토어 데이터
  const { loginId } = useAuthStore();
  const [replies, setReplies] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [refresh, setRefresh] = useState(false);

  // 마운트 시 또는 부모번호/갱신상태 변경 시 데이터 조회
  useEffect(() => {
    getReplies(parent_seq).then(res => setReplies(res.data));
  }, [parent_seq, refresh]);

  // 댓글 등록: 로그인 아이디가 있을 때만 실행
  const handleSubmit = () => {
    if (!loginId) return alert('로그인이 필요합니다.');
    if (!newComment.trim()) return alert('내용을 입력해주세요.');

    const data = {
      parent_seq: parent_seq,
      writer: loginId,
      contents: newComment
    };

    postReply(data).then(() => {
      setNewComment(''); // 입력창 초기화
      setRefresh(!refresh); // 목록 갱신 트리거
    }).catch(err => alert('등록 실패'));
  };

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
        <div className={styles.inputAvatar}>{loginId ? loginId[0].toUpperCase() : 'G'}</div>
        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            className={styles.commentInput} 
            placeholder={loginId ? "댓글 추가..." : "로그인 후 댓글을 작성할 수 있습니다."} 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!loginId}
          />
          {newComment && (
            <div className={styles.inputActions}>
              <button className={styles.cancelBtn} onClick={() => setNewComment('')}>취소</button>
              <button 
                className={`${styles.submitBtn} ${styles.active}`}
                onClick={handleSubmit}
              >
                댓글
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 댓글 목록 출력 영역 */}
      <div className={styles.listWrapper}>
        {replies && replies.length > 0 ? (
          replies.map((reply) => (
            <Reply
              key={reply.seq}
              seq={reply.seq}
              loginId={loginId}
              writer={reply.writer}
              contents={reply.contents}
              write_date={reply.write_date}
              onDelete={() => handleDelete(reply.seq)}
              onUpdate={() => setRefresh(!refresh)}
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
