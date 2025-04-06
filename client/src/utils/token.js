export const saveToken = (token) => {
    localStorage.setItem('id_token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('id_token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('id_token');
  };
  