import io from "socket.io-client";

const token = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];
// console.log(`token: ${token}`);

export let socket = io.connect(process.env.APP_URL, {
  auth: {
    token,
  },
});