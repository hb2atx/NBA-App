import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import "./Home.css";

function Home() {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col style={{ marginTop: '3rem'}}>
          <h1 className="h1-title" style={{ color: '#FB8122'}}>Welcome to OverPaid</h1>
          <p>Some simple web app info</p>
          <div className="button-container"> 
          <Button href="/auth" variant="contained" size="lg" className="mr-3">Login</Button>
          <Button href="/auth/register" variant="outline-'#FB8122'" size="lg">Register</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
