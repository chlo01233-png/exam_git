import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.css';
import { getMember } from './membersApi';
import useAuthStore from '../../store/authStore';

const Mypage = () => {
    const navigate = useNavigate();
    const loginId = useAuthStore(state => state.loginId)
    const [member, setMember] = useState({});

    useEffect(() =>{
        if(loginId) {
            getMember(loginId).then(resp => {
                setMember(resp.data);
            })
        }
    },[loginId])

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <div className={styles.header}>
                    <div className={styles.avatar}>👤</div>
                    <h1 className={styles.title}>마이페이지</h1>
                    <p className={styles.subtitle}>내 정보를 확인하고 관리하세요</p>
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>아이디</span>
                        <span className={styles.value} >{member.id}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label} >이름</span>
                        <span className={styles.value} >{member.name}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>이메일</span>
                        <span className={styles.value}>{member.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>연락처</span>
                        <span className={styles.value}>{member.phone}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>주소</span>
                        <span className={styles.value}>{member.zipcode ? `(${member.zipcode}) ${member.address1} ${member.address2}` : ''}</span>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button className={styles.editButton}>정보 수정</button>
                    <button className={styles.backButton} onClick={() => navigate('/main')}>뒤로 가기</button>
                </div>
            </div>
        </div>
    );
};

export default Mypage;
