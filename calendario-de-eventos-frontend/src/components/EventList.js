import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents, deleteEvent } from '../api'; 
import Calendar from 'react-calendar'; 
import '../styles/calendar.css'; 
import { FaPlus } from "react-icons/fa";
import { Button, Card, ListGroup, Row, Col, Container, Alert, Badge } from 'react-bootstrap';

const EventList = ({ token }) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const fetchEvents = async () => {
        try {
          const res = await getEvents(token);  
          setEvents(res.data);  
        } catch (err) {
          console.error('Failed to fetch events', err);
        }
      };
      fetchEvents();
    }
  }, [token, navigate]);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id, token); 
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      console.error('Failed to delete event', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/events/edit/${id}`);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isEventOnSelectedDay = (event, date) => {
    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);
    const selectedStart = new Date(date.setHours(0, 0, 0, 0)); 
    const selectedEnd = new Date(date.setHours(23, 59, 59, 999)); 

    return (eventStart <= selectedEnd && eventEnd >= selectedStart); 
  };

  const selectedDayEvents = events.filter(event => isEventOnSelectedDay(event, selectedDate));

  const futureEvents = events.filter(event => {
    const eventStart = new Date(event.startTime);
    return eventStart > selectedDate && !selectedDayEvents.some(selectedEvent => selectedEvent._id === event._id);
  });

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2>Seus eventos</h2>
        </Col>
        <Col className="text-end">
          <Button 
            onClick={() => navigate('/events/create')} 
            variant="info" 
            className="rounded-pill">
            { <FaPlus style={{paddingBottom: '3px'}} />} 
            Cria novo evento
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          {selectedDayEvents.length > 0 && (
            <Card className="mb-4 " data-bs-theme="dark" style={{borderRadius:'16px'}} >
              <Card.Body>
                <Card.Title>Seus eventos de {selectedDate.toLocaleDateString()}</Card.Title>
                <ListGroup variant="flush" className='my-2'>
                  {selectedDayEvents.map(event => (
                    <ListGroup.Item key={event._id} className='my-2'>
                      <strong>{event.description}</strong><br />
                      <em>{new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</em><br />
                      <Button variant='info' className="me-3 rounded-pill mt-2" onClick={() => handleEdit(event._id)}>Editar</Button>
                      <Button variant='danger' className="rounded-pill mt-2" onClick={() => handleDelete(event._id)}>Deletar</Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}

          {futureEvents.length > 0 && (
            <Card className="mb-4" data-bs-theme="dark" style={{borderRadius:'16px'}} >
              <Card.Body>
                <Card.Title>Seus futuros eventos</Card.Title>
                <ListGroup variant="flush">
                  {futureEvents.map(event => (
                    <ListGroup.Item key={event._id}>
                      <strong>{event.description}</strong><br />
                      <em>{new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</em><br />
                      <Button variant='info' className="me-3 rounded-pill mt-2" onClick={() => handleEdit(event._id)}>Editar</Button>
                      <Button variant='danger' className="rounded-pill mt-2" onClick={() => handleDelete(event._id)}>Deletar</Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}

          {selectedDayEvents.length === 0 && futureEvents.length === 0 && (
            <Alert variant="info" style={{borderRadius: '16px'}}>
              Você não tem nenhum evento hoje ou no futuro
            </Alert>
          )}
        </Col>
        
        <Col md={8}>
          <Col className="mb-4">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="w-100"
              tileContent={({ date,  }) => {
                const eventsInDay = events.filter(event => isEventOnSelectedDay(event, date));
                
                return (
                  eventsInDay.length > 0 && (
                    <div className="d-flex flex-column align-items-center">
                      <Badge bg="danger" pill>
                        Eventos: {eventsInDay.length}
                      </Badge>
                    </div>
                  )
                );
              }}
            />
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default EventList;
