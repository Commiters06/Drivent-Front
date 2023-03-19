import api from './api';

export async function getEventInfo() {
  const response = await api.get('/event');
  return response.data;
}

export async function getEventDays() {
  const response = await api.get('/event/days');
  return response.data;
}
