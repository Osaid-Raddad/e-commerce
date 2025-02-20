import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import CustomNavbar from '../components/user/navbar/Navbar'
import Blackfridaynav from '../components/user/navbar/Blackfridaynav.jsx'
import Middlenav from '../components/user/navbar/Middlenav.jsx';
import Searchnav from '../components/user/navbar/Searchnav.jsx';
import Footer from '../components/user/footer/Footer.jsx';

export default function UserLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {isHomePage && <Blackfridaynav />}
      <Middlenav/>
      <Searchnav/>
      <CustomNavbar />
      <Outlet />
      <Footer/>
    </>
  );
}
