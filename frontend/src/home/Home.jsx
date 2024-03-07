import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

function Home() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLoginClick = () => {
    navigate('/auth'); // Use navigate to go to the /auth route
  };

  const handleRegisterClick = () => {
    navigate('/auth/register'); // Use navigate to go to the /auth/register route
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col style={{ marginTop: '3rem'}}>
          <h1 className="h1-title" style={{ color: '#FB8122'}}>Welcome to OverPaid</h1>
          <p>Some simple web app info</p>
          <div className="button-container"> 
          <Button onClick={handleLoginClick} variant="contained" size="lg" className="mr-3">Login</Button>
          <Button onClick={handleRegisterClick} variant="outline-'#FB8122'" size="lg">Register</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
