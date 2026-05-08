import React from 'react';
import styles from "./Login.module.css";

const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>로그인</h1>
                    <p className={styles.subtitle}>계정 정보를 입력하여 로그인해주세요</p>
                </div>
                
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.inputField}>
                        <label className={styles.label}>아이디</label>
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="아이디를 입력하세요." 
                            required 
                        />
                    </div>
                    
                    <div className={styles.inputField}>
                        <label className={styles.label}>비밀번호</label>
                        <input 
                            type="password" 
                            className={styles.input} 
                            placeholder="비밀번호를 입력하세요" 
                            required 
                        />
                    </div>
                    
                    <button type="submit" className={styles.loginButton}>
                        로그인
                    </button>
                </form>
                
                <div className={styles.actions}>
                    <a href="#forgot" className={styles.link}>비밀번호를 잊으셨나요?</a>
                    <span>
                        처음이신가요? <a href="#signup" className={styles.link}>회원가입</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
