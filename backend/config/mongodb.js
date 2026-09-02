import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import mongoose from "mongoose";

const mongoconnect = async () => {
    try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("mongo is connected");
    }catch(error){
     console.error("mongo is not connected", error.message);
     process.exit(1);
    }
};
export default mongoconnect;