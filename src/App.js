import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import List from './domains/board/List';
import './App.css'; // Keep the App.css import if there are global styles
import Login from './domains/members/Login';
import Reply from './domains/board/reply/Reply';
import ReplyList from './domains/board/reply/ReplyList';
import Signup from './domains/members/Signup';
import Main from './domains/Main/Main';
import useAuthStore from './store/authStore';
import Detail from "./domains/board/Detail";
import Mypage from './domains/members/Mypage';



function App() {
  const token = useAuthStore(state => state.token)
  console.log(token)
  return (
    <div className="App">


                


      <Routes>
        <Route index element={
          token ?
            <Main />
            :
            <Login />
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path="/board">
          <Route path="list" element={<List />} />
          <Route path=":seq" element={<Detail />} /> {/* New route for board detail */}
          <Route path='reply' element={<ReplyList />} />
        </Route>


      </Routes>

    </div>
  );

}

export default App;
