import React from 'react';
import { NavLink } from 'react-router-dom';

// A helper component for icons to keep the NavLink clean
const NavIcon = ({ iconClass }) => <i className={`${iconClass} w-6 h-6 mr-3`}></i>;

const Sidebar = () => {
  // This function applies different styles based on whether the link is active
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-lg text-gray-700 transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-100 text-indigo-700 font-semibold'
        : 'hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <aside className="w-64 flex-shrink-0 bg-white shadow-lg fixed top-0 left-0 h-full z-20 pt-20">
      <div className="p-4">
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard" className={getNavLinkClass} end>
                <NavIcon iconClass="fas fa-th-large" />
                Dashboard
              </NavLink>
            </li>
            <li className="mt-2">
              <NavLink to="/profile" className={getNavLinkClass}>
                <NavIcon iconClass="fas fa-user" />
                My Profile
              </NavLink>
            </li>
            <li className="mt-2">
              <NavLink to="/events" className={getNavLinkClass}>
                <NavIcon iconClass="fas fa-calendar-alt" />
                Events
              </NavLink>
            </li>
            <li className="mt-2">
              <NavLink to="/directory" className={getNavLinkClass}>
                <NavIcon iconClass="fas fa-address-book" />
                Alumni Directory
              </NavLink>
            </li>
            <li className="mt-2">
              <NavLink to="/donate" className={getNavLinkClass}>
                <NavIcon iconClass="fas fa-donate" />
                Donate
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

