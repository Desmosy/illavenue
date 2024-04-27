import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PostDetails from './PostDetails';
import CreatePostForm from './CreatePostForm'; // Import CreatePostForm
import SidebarMenu from './SideBarMenu';
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <SidebarMenu />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/create-post" element={<CreatePostForm />} /> {/* Route for CreatePostForm */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
