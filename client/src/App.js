import React from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Footer from './components/Footer/Footer';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <>
   
    <BrowserRouter>
    <GoogleOAuthProvider clientId="139751339943-qhn481us4opmb26cdv4q60f1n13ucee0.apps.googleusercontent.com"> 
      <Container maxidth="xl">
          <Navbar/>
          <Routes>
            <Route path="/"  element={<Navigate to="/posts"/>} />
            <Route path="/posts"  element={<Home />} />
            <Route path="/posts/search"  element={<Home />} />
            <Route path="/posts/:id"  element={<PostDetails />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts"/>} />
          </Routes>
           
      </Container>
      </GoogleOAuthProvider> 
    </BrowserRouter>
    
    </>  
    
  );
}

export default App;
