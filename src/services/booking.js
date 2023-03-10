import api from './api';

export async function getMyBooking(token) {
  const response = await api.get('/booking/', { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}

export async function getRoomBookings(token, roomId) {
  const response = await api.get(`/booking/${roomId}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}

export async function postBooking(token, roomId) {
  const response = await api.post('/booking/', { roomId }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}
