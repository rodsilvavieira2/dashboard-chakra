import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://infinite-oasis-50913.herokuapp.com'
})