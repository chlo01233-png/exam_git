import React from 'react';

import List from './domains/board/List';
import './App.css'; // Keep the App.css import if there are global styles

import Login from './domains/members/Login';
import { Route, Routes } from 'react-router-dom';
import Reply from './domains/board/reply/Reply';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route index element={<Login />}/>
        <Route path="/board">
          <Route path="list" element={<List />} />
          <Route path='reply' element={<Reply />} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
