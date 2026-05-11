import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Main.module.css';
import useAuthStore from '../../store/authStore';
import { deleteMember } from '../members/membersApi';

const Main = () => {
    const navigate = useNavigate();
    const logout = useAuthStore(state => state.logout)
    const loginId = useAuthStore(state => state.loginId)

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            // 로그아웃 로직 (예: 로컬 스토리지 삭제 등)
            console.log("로그아웃 완료");
            logout()
            navigate('/');
        }
    };

    const handleWithdrawal = () => {
        if (window.confirm("정말로 탈퇴하시겠습니까? 탈퇴 후 데이터 복구는 불가능합니다.")) {
            deleteMember(loginId).then(resp => {
                if(resp.data) {
                    alert("탈퇴 처리가 완료되었습니다.");
                    logout();
                    navigate('/');
                }
            }).catch(error => {
                console.error("회원탈퇴 실패:", error);
                alert("탈퇴 처리 중 오류가 발생했습니다.");
            });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainCard}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Welcome Back!</h1>
                    <p className={styles.subtitle}>{loginId}님, 환영합니다. 무엇을 도와드릴까요?</p>
                </header>

                <div className={styles.menuGrid}>
                    <Link to="/board/list" className={styles.menuItem}>
                        <div className={styles.icon}>📋</div>
                        <span className={styles.menuLabel}>게시판</span>
                        <p className={styles.menuDesc}>자유로운 소통의 공간</p>
                    </Link>

                    <Link to="/mypage" className={styles.menuItem}>
                        <div className={styles.icon}>👤</div>
                        <span className={styles.menuLabel}>마이페이지</span>
                        <p className={styles.menuDesc}>내 정보 확인 및 수정</p>
                    </Link>

                    <button onClick={handleWithdrawal} className={styles.menuItem}>
                        <div className={styles.icon}>⚠️</div>
                        <span className={styles.menuLabel}>회원탈퇴</span>
                        <p className={styles.menuDesc}>계정 정보 영구 삭제</p>
                    </button>
                </div>

                <footer className={styles.footer}>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        로그아웃
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default Main;
