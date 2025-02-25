import React from 'react'
import styles from './profile.module.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';
import SideBar from '../../../components/user/sidebar/SideBar';
import { Col, Container, Row } from 'react-bootstrap';
export default function Profile() {
  return (
    <>
      <Container fluid >
        <Row>
          <Col md={2}><SideBar/></Col>
          <Col md={8}><Outlet/></Col>
        </Row>
        
        
      </Container>
    </>
  )
}
