import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Signup.module.css";
import { idCk,signup } from './membersApi';

const Signup = () => {

    const navi = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        pw: '',
        name: '',
        phone: '',
        email: '',
        zipcode: '',
        address1: '',
        address2: ''
    });

    // 비밀번호 확인은 서버에 전송하지 않으므로 별도 상태로 관리
    const [pwConfirm, setPwConfirm] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePostCode = () => {
        new window.kakao.Postcode({
            oncomplete: function (data) {
                setFormData(prev => ({ ...prev, zipcode: data.zonecode, address1: data.roadAddress }))
            }
        }).open();
    }

    const handleIdCk = () => {
        if (!formData.id.trim()) {
            alert("아이디를 입력해주세요.");
            return;
        }
        
        idCk(formData.id)
            .then(resp => {
                if (resp.data) {
                    alert("사용 가능한 아이디입니다.");
                } else {
                    alert("이미 사용 중인 아이디입니다.");
                }
            })
            .catch(error => {
                console.error("아이디 중복 체크 실패:", error);
                alert("중복 체크 중 오류가 발생했습니다.");
            });
    }

    // 비밀번호 일치 여부 확인 함수
    const isPwMatched = () => {
        return formData.pw !== '' && formData.pw === pwConfirm;
    }

    const handleSignup = () => {
        if (!formData.id || !formData.pw || !formData.name || !formData.phone) {
            alert("필수 정보를 모두 입력해주세요.");
            return;
        }

        if (!isPwMatched()) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        console.log("회원가입 전송 데이터 (pwConfirm 제외):", formData);
        
        signup(formData)
            .then(resp => {
                if (resp.data) {
                    alert("회원가입이 완료되었습니다!");
                    // 필요 시 페이지 이동 로직 추가
                    navi("/")
                }
            })
            .catch(error => {
                console.error("회원가입 실패:", error);
                alert("회원가입 중 오류가 발생했습니다.");
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.signupCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>계정 만들기</h1>
                    <p className={styles.subtitle}>새로운 여정을 함께 시작해보세요</p>
                </div>

                <div className={styles.form}>
                    <div className={styles.idRow}>
                        <div className={styles.inputField}>
                            <label className={styles.label}>아이디</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="사용할 아이디를 입력하세요"
                                required
                                name='id'
                                value={formData.id}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="button" className={styles.checkButton} onClick={handleIdCk}>중복 확인</button>
                    </div>

                    <div className={styles.inputRow}>
                        <div className={styles.inputField}>
                            <label className={styles.label}>비밀번호</label>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="비밀번호"
                                required
                                name='pw'
                                value={formData.pw}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.label}>비밀번호 확인</label>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="비밀번호 확인"
                                required
                                value={pwConfirm}
                                onChange={(e) => setPwConfirm(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {pwConfirm && (
                        <p style={{ 
                            fontSize: '12px', 
                            marginTop: '-10px', 
                            marginBottom: '10px',
                            color: isPwMatched() ? 'green' : 'red' 
                        }}>
                            {isPwMatched() ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                        </p>
                    )}

                    <div className={styles.inputRow}>
                        <div className={styles.inputField}>
                            <label className={styles.label}>이름</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="홍길동"
                                required
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.label}>연락처</label>
                            <input
                                type="tel"
                                className={styles.input}
                                placeholder="010-0000-0000"
                                required
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.inputField}>
                        <label className={styles.label}>이메일 주소</label>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="example@email.com"
                            required
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.zipCodeRow}>
                        <div className={styles.inputField}>
                            <label className={styles.label}>우편번호</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="12345"
                                readOnly
                                name='zipcode'
                                value={formData.zipcode}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="button" className={styles.searchButton} onClick={handlePostCode}>주소 찾기</button>
                    </div>

                    <div className={styles.inputField}>
                        <label className={styles.label}>도로명 주소</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="기본 주소"
                            readOnly
                            name='address1'
                            value={formData.address1}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputField}>
                        <label className={styles.label}>상세 주소</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="상세 주소를 입력하세요"
                            required
                            name='address2'
                            value={formData.address2}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="button" className={styles.signupButton} onClick={handleSignup}>
                        회원가입 완료
                    </button>
                </div>

                <div className={styles.actions}>
                    <span>이미 계정이 있으신가요?</span>
                    <Link to="/login" className={styles.link}>로그인하기</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
