export const getAuthToken = () => {
  if (typeof window === 'undefined') return '';

  const sessionToken = window.sessionStorage.getItem('token');
  return sessionToken ? JSON.parse(sessionToken) : '';
};
