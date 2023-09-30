import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import setAvatar from './componenets/SetAvatar'

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path = '/register' element = {<Register/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/setAvatar' element = {<setAvatar/>}/>
      <Route path = '/chat' element = {<Chat/>}/>
    </Routes>
  </BrowserRouter>
  );
}

