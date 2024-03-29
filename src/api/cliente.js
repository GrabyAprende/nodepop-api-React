import axios from "axios";

//funcion de axios para crear cliente, configurando la url que se usara siempre.
const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: error.response });
    }
    return Promise.reject({
      message: error.response.statusText,
      statusCode: error.response.status,
      ...error.response.data,
    });
  }
);

export const setAuthorizationHeader = (token) =>
  (client.defaults.headers.common["Authorization"] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common["Authorization"];
};

export default client;
