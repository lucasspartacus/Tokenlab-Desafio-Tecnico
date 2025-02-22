import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaArrowLeft, FaEyeSlash, FaEye } from 'react-icons/fa';
import { FaEnvelope } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password);
      alert('Usuário cadastado com sucesso! Agora faça seu login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err);
      toast.error('Email já cadastrado', {
             position: 'top-center',
             autoClose: 3000,
       });
    }
  };

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword); 
};  

  return (
    <Container className="d-flex justify-content-center align-items-center "  style={{ minHeight: '20vh', marginTop: '10%' }}>
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
        
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Cadastro</h2>
              <Form onSubmit={handleRegister}>
              <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nome</Form.Label>
                 <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                  </span>
                 
                  <Form.Control
                    type="name"
                    placeholder="Calendar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  </div>
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                  </span>
                  <Form.Control
                    type="email"
                    placeholder="calendar@gmail.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  </div>
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label>Senha</Form.Label>
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
                  Criar conta
                </Button>
                <div className='text-center'>
                   <Button variant="link" className='text-black' as={Link} to="/login">Já possui uma conta?</Button>
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

export default Register;
