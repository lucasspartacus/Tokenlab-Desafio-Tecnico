import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (name, email, password) => {
  return axios.post(`${API_URL}/auth/register`, {name, email, password });
};

export const loginUser = async (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const getEvents = async (token) => {
  return axios.get(`${API_URL}/events`, { headers: { Authorization: `Bearer ${token}` } });
};

export const createEvent = async (eventData, token) => {
  return axios.post(`${API_URL}/events`, eventData, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateEvent = async (id, eventData, token) => {
  return axios.put(`${API_URL}/events/${id}`, eventData, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteEvent = async (id, token) => {
  return axios.delete(`${API_URL}/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
