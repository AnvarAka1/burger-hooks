import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-eef64.firebaseio.com/"
});

export default instance;
