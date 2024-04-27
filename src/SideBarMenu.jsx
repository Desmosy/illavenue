import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
  return (
    <div className="sidebar-menu">
      <h3>Feed</h3>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create-post">Create Post</Link> {/* Link to the create post page */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarMenu;
