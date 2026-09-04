// import Sequelize from "sequelize"
// import dotenv from "dotenv"

// dotenv.config();

// const sequelize = new Sequelize(process.env.PG_URI,
//     {
//         dialect:"postgres",
//         dialectOptions: {
//             ssl:{
//                 require:true,
//                 rejectUnauthorized:false,
//             },
//         },
//         logging:false,
//     });

// const connectPostgres = async ()=>{
//     try{
//         await sequelize.authenticate();
//         console.log("postgres is connected");
//     }catch(error){
//         console.error("postgres is not connected", error.message);
//         process.exit(1);
//     }
// };
// export {sequelize, connectPostgres};    


import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const pgUri = process.env.PG_URI;

if (!pgUri) {
  console.error("❌ CRITICAL ERROR: PG_URI is missing from .env file!");
  process.exit(1);
}

const sequelize = new Sequelize(pgUri, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Bypasses self-signed certificate errors
    },
  },
  logging: false,
});

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("postgres is connected");
  } catch (error) {
    console.error("postgres is not connected:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectPostgres };