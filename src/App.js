import React from 'react';



import { Routes, Route, Navigate } from 'react-router-dom';

import List from './domains/Board/List';
import './App.css'; // Keep the App.css import if there are global styles


import Login from './domains/members/Login';
import Signup from './domains/members/Signup';
import Main from './domains/Main/Main';
import useAuthStore from './store/authStore';
import Detail from "./domains/Board/Detail"


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
                <Route path="/board">
                    <Route path="list" element={<List />} />
                    <Route path=":seq" element={<Detail />} /> {/* New route for board detail */}
                </Route>


            </Routes>

        </div>
    );

}

export default App;
