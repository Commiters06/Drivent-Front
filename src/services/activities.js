import api from './api';

export async function getActivities(token, date) {
  const response = await api.get(`/activity/?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}

export async function joinActivity(token, id) {
  const response = await api.post(`/activity/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}
