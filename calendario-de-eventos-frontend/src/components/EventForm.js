import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { createEvent, getEvents, updateEvent } from '../api';

const EventForm = ({ token }) => {
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      if (id) {
        const fetchEvents = async () => {
          try {
            const res = await getEvents(token);
            const event = res.data.find((event) => id === event._id);
            console.log(event);
            setDescription(event.description);
            setStartTime(format(new Date(event.startTime), "yyyy-MM-dd'T'HH:mm"));
            setEndTime(format(new Date(event.endTime), "yyyy-MM-dd'T'HH:mm"));
            setLoading(false);
          } catch (err) {
            console.error('Failed to fetch events', err);
            setLoading(false); 
          }
        };
        fetchEvents();
      } else {
        setDescription('Exemplo evento');
        setStartTime('2025-02-20T10:00');
        setEndTime('2025-02-20T12:00');
        setLoading(false); 
      }
    }
  }, [token, id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(endTime) <= new Date(startTime)) {
      toast.error('Data final deve ser maior que inicial');
      return;
    }

    const eventData = { description, startTime, endTime };

    try {
      if (id) {
        await updateEvent(id, eventData, token);
      } else {
        await createEvent(eventData, token);
      }
      navigate('/events');
    } catch (err) {
      console.error('Event creation/update failed', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <div
            style={{
              position: 'absolute',
              marginTop: '-1%',
              left: '20px',
              cursor: 'pointer',
              zIndex: 10,
            }}
            onClick={() => navigate('/events')}
          >
            <FaArrowLeft size={30} />
          </div>
          <h2 className="text-center">{id ? 'Atualizar evento' : 'Criar novo evento'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDescription">
              <Form.Label>Decrição do evento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escreve a descição do evento"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formStartTime" className="mt-3">
              <Form.Label>Início do evento</Form.Label>
              <Form.Control
                type="datetime-local"
                value={ startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group controlId="formEndTime" className="mt-3">
              <Form.Label>Fim do evento</Form.Label>
              <Form.Control
                type="datetime-local"
                value={ endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="info"
              type="submit"
              className="mt-4 w-100"
              style={{ borderRadius: '16px' }}
            >
              {id ? 'Atualizar' : 'Criar'} evento
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default EventForm;
