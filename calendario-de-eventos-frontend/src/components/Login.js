import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      setUser(res.data.token);
      navigate('/events');
    } catch (err) {
      toast.error('Email ou senha incorretos', {
        position: 'top-center',
        autoClose: 3000,
      });
      console.error('Login failed', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '20vh', marginTop: '10%' }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <div
            style={{
              position: 'absolute',
              marginTop: '-9%',
              left: '20px',
              cursor: 'pointer',
              zIndex: 10,
            }}
            onClick={() => navigate('/')}
          >
            <FaArrowLeft size={30} />
          </div>

          <Card.Title as="h2" className='mb-5 text-center'>É bom ver você novamente!</Card.Title>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Seu email</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="calendar@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label>Sua senha</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Calendar@123"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />} 
                    </span>
                  </div>
                </Form.Group>

                <Button variant="info" type="submit" className="w-100">
                  Entrar na conta
                </Button>
                <div className="d-flex justify-content-center flex-md-column flex-xl-row">
                  <Button variant="link" className='text-black mx-2' as={Link} to="/register">
                    Não tem uma conta?
                  </Button>
                  <Button variant="link" className='text-black' as={Link} to="/login">
                    Esqueceu sua senha?
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Login;
