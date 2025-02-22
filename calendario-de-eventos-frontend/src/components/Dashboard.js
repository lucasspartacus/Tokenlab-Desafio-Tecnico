import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import calendarImg from '../img/google-calendar-ipad.jpg';
import cellphoneImg from '../img/android-calendar.png';
import bgImg from '../img/bg.png';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  return (
    <div style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '94.8vh', marginTop:'-10px'}}>
      <Container className="pt-5" >
        <Row className="justify-content-center">
          <Col md={8}>
            <Card border="0" className="text-center p-4">
              <Card.Body style={{ position: 'relative' }}>
                <Card.Title as="h1">Bem-vindo ao Event Calendar</Card.Title>
                <Card.Text className="lead">
                 Mantenha-se organizado e nunca mais perca um evento importante.
                </Card.Text>
                <Button variant="info" size="lg" as={Link} to="/register" className="no-radius-btn">
                 Explorar calendário
                </Button>
                <br />
                <Button variant="link" className="text-black" as={Link} to="/login">
                Já tem uma conta? Entre agora
                </Button>

                <img
                  src={calendarImg}
                  alt="Calendar"
                  className="mt-4"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <img
                  src={cellphoneImg}
                  alt="Cellphone"
                  className="absolut z-31"
                  style={{
                    position: 'absolute',
                    bottom: '-80px',
                    right: '50px',
                    maxWidth: '28%',
                    height: 'auto'
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashBoard;
