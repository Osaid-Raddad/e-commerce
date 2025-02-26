import React from 'react'
import styles from './sideBar.module.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
export default function SideBar() {
  return (
    <>
    <Sidebar className={styles.SideBar}>
    <Menu className={styles.menu}
      menuItemStyles={{
        button: {
          // the active class will be added automatically by react router
          // so we can use it to style the active menu item
          [`&.active`]: {
            backgroundColor: '#13395e',
            color: '#b6c8d9',
          },
        },
      }}
    >
      <MenuItem component={<Link to={'/profile/info'} />}> Profile Info</MenuItem>
      <MenuItem component={<Link to={'/profile/orders'} />}> My Order </MenuItem>
      <MenuItem component={<Link to={'/profile/edit'} />}> Edit Profile</MenuItem>
    </Menu>
  </Sidebar>
  </>
  )
}
