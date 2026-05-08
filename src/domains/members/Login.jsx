import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Login.module.css";
import { signin } from './membersApi';
import useAuthStore from '../../store/authStore';

const Login = () => {

    const [user,setUser] = useState({id :"",pw:""});
    const login = useAuthStore(state => state.login)
    const navi = useNavigate();
    const handleChange = (e) => {
        const {name,value} = e.target
        setUser(prev => ({...prev,[name]:value}));
       
    }

    const handleLogin = () => {
        signin(user).then(resp => {
            login(resp.data)
            navi(`/`);
        })
    } 

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>로그인</h1>
                    <p className={styles.subtitle}>계정 정보를 입력하여 로그인해주세요</p>
                </div>

                <div className={styles.form}>
                    <div className={styles.inputField}>
                        <label className={styles.label}>아이디</label>
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="아이디를 입력해주세요." 
                            required 
                            name='id'
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputField}>
                        <label className={styles.label}>비밀번호</label>
                        <input 
                            type="password" 
                            className={styles.input} 
                            placeholder="비밀번호를 입력하세요" 
                            required 
                            name='pw'
                            onChange={handleChange}
                        />
                    </div>

                    <button type="button" className={styles.loginButton} onClick={handleLogin}>
                        로그인
                    </button>
                </div>

                <div className={styles.actions}>
                    {/* <Link to="/forgot" className={styles.link}>비밀번호를 잊으셨나요?</Link> */}
                    <span>
                        처음이신가요? <Link to="/signup" className={styles.link}>회원가입</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};


export default Login;
