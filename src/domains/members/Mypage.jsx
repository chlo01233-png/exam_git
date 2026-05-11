import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.css';
import { getMember, updateMember } from './membersApi';
import useAuthStore from '../../store/authStore';

const Mypage = () => {
    const navigate = useNavigate();
    const loginId = useAuthStore(state => state.loginId)
    const [member, setMember] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() =>{
        if(loginId) {
            getMember(loginId).then(resp => {
                setMember(resp.data);
                setEditData(resp.data);
            })
        }
    },[loginId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePostCode = () => {
        new window.kakao.Postcode({
            oncomplete: function (data) {
                setEditData(prev => ({ ...prev, zipcode: data.zonecode, address1: data.roadAddress }))
            }
        }).open();
    }

    const handleSave = () => {
        updateMember(editData).then(resp => {
            if(resp.status === 200) {
                alert("정보가 수정되었습니다.");
                setMember(editData);
                setIsEditing(false);
            }
        }).catch(error => {
            console.error("수정 실패:", error);
            alert("정보 수정 중 오류가 발생했습니다.");
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <div className={styles.header}>
                    <div className={styles.avatar}>👤</div>
                    <h1 className={styles.title}>마이페이지</h1>
                    <p className={styles.subtitle}>{isEditing ? '내 정보를 수정하세요' : '내 정보를 확인하고 관리하세요'}</p>
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>아이디</span>
                        <span className={styles.value}>{member.id}</span>
                    </div>

                    {isEditing ? (
                        <>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>이름</span>
                                <input 
                                    className={styles.editInput} 
                                    name="name" 
                                    value={editData.name || ''} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>이메일</span>
                                <input 
                                    className={styles.editInput} 
                                    name="email" 
                                    value={editData.email || ''} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>연락처</span>
                                <input 
                                    className={styles.editInput} 
                                    name="phone" 
                                    value={editData.phone || ''} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>주소</span>
                                <div className={styles.addressGroup}>
                                    <div className={styles.zipcodeRow}>
                                        <input 
                                            className={`${styles.editInput} ${styles.readOnlyInput}`} 
                                            placeholder="우편번호" 
                                            value={editData.zipcode || ''} 
                                            readOnly 
                                        />
                                        <button className={styles.smallSearchButton} onClick={handlePostCode}>검색</button>
                                    </div>
                                    <input 
                                        className={`${styles.editInput} ${styles.readOnlyInput}`} 
                                        placeholder="기본 주소" 
                                        value={editData.address1 || ''} 
                                        readOnly 
                                    />
                                    <input 
                                        className={styles.editInput} 
                                        placeholder="상세 주소를 입력하세요" 
                                        name="address2" 
                                        value={editData.address2 || ''} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>이름</span>
                                <span className={styles.value}>{member.name}</span>
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
                                <span className={styles.value}>
                                    {member.zipcode ? `(${member.zipcode}) ${member.address1} ${member.address2}` : ''}
                                </span>
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.buttonGroup}>
                    {isEditing ? (
                        <>
                            <button className={styles.editButton} onClick={handleSave}>저장</button>
                            <button className={styles.backButton} onClick={() => { setIsEditing(false); setEditData(member); }}>취소</button>
                        </>
                    ) : (
                        <>
                            <button className={styles.editButton} onClick={() => setIsEditing(true)}>정보 수정</button>
                            <button className={styles.backButton} onClick={() => navigate('/main')}>뒤로 가기</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Mypage;
