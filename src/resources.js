import axios from "axios";

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const getPosts = async () =>
  instance
    .get(`/posts`)
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log('error fetch data'));