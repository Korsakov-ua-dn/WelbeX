import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_PUBLIC_API_URL}`,
});

export const ordersAPI = {
  getAllUser(payload) {
    return instance.get(`/api/orders`, { params: payload } );
  },
};