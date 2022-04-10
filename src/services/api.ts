import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://secret-peak-02363.herokuapp.com/'
})