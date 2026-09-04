import { Server } from "socket.io";
import {registerProctorHandlers} from "../sockets/proctorHandler.js"

let io;

export const initSocket = (server) =>{
    io = new Server(server, {
        cors:{
            origin:"*",
            methods: ["GET","POST"],
        },
    });
    io.on("connection", (socket)=>{
        console.log(`client connected : ${socket.id}`);

        registerProctorHandlers(io, socket);

        socket.on("disconnect", ()=>{
            console.log(`client disconnected : ${socket.id}`);
        });
    });
return io;
};

export const getIO = () =>{
  if(!io){
    throw new Error("socket.io not initialized. Call initSocket(server) first.");
  }
  return io;
}