import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './Pages/Login';
import UserList from './Pages/User';
import AddEdit_User from './Shared_Components/AddEdit_User';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/AddEdit_user" element={<AddEdit_User />} />
        <Route path="/AddEdit_user/:id" element={<AddEdit_User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
