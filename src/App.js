import React from 'react';
import Login from './domains/members/Login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />}/>

      </Routes>
    </div>
  );
}

export default App;
