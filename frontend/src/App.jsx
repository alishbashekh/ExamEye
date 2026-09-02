import { useEffect , useState } from "react";
import axios from "axios";

function App(){
  const [message, SetMessage]= useState("");
  
  useEffect(()=>{
    axios.get("http://localhost:5000/api/test")
    .then((res)=> SetMessage(res.data.message))
    .catch((err)=> console.error("frontend-backend connnecction failed",err));
  },[]);
  return <h1>{message || "connecting..."}</h1>
}
export default App;
