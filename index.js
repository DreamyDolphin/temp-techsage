// import express from "express";
// import cors from "cors";
// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import 'dotenv/config';
// import bodyParser from 'body-parser';
// import dbconnect from "./lib/dbconnect.js";
// import signuprouter from "./routes/Rsignupuser.js";
// import verifycoderouter from "./routes/Rverifycode.js";
// import contactusrouter from "./routes/Rcontactus.js";
// import signinrouter from "./routes/Rsigninuser.js";
// import logoutrouter from "./routes/RUserlogout.js";
// import addAddressrouter from "./routes/Radduseraddress.js";






// // Initialize the server
// const server = express();
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());

// // Enable CORS and JSON parsing
// // server.use(cors({
// //     origin: process.env.CLIENT_URL || "https://techsagelabs.in",
// //     credentials: true, // Include credentials like cookies
// // }));
// server.use(cors());

// server.use(express.json());

// const database=  dbconnect();
// console.log(database);



// // Define routes
// server.get('/', (req, res) => {
//     res.send('Server is ready');
// });

// // defining middleware for verifying token to restrict anauthorized user


// // now inroducing the middleware in between 

// server.use('/api/Rsignupuser',signuprouter);
// server.use('/api/Rverifycode',verifycoderouter);
// server.use('/api/Rcontactus',contactusrouter);
// server.use('/api/Rsigninuser',signinrouter);
// server.use('/api/RUserlogout',logoutrouter);
// server.use('/api/RAdduseraddress',addAddressrouter)

// // Use a different port if 8000 is unavailable
// const port = process.env.PORT || 3000; // Default to port 3000 if 8000 is unavailable
// // Start the server

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import dbconnect from "./lib/dbconnect.js";
import signuprouter from "./routes/Rsignupuser.js";
import verifycoderouter from "./routes/Rverifycode.js";
import contactusrouter from "./routes/Rcontactus.js";
import signinrouter from "./routes/Rsigninuser.js";
import logoutrouter from "./routes/RUserlogout.js";
import addAddressrouter from "./routes/Radduseraddress.js";

// Initialize the server
const server = express();

// Middleware
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(cors());
server.options("*", cors()); // Handle preflight requests globally

// Manually set headers if needed
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL || "https://techsagelabs.in");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-access-token, x-refresh-token");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Database connection
const database = dbconnect();
if (database) {
  console.log("Database connected successfully");
} else {
  console.error("Failed to connect to the database");
}

// Root route
server.get("/", (req, res) => {
  res.send("Server is ready");
});

// Routes
server.use("/api/Rsignupuser", signuprouter);
server.use("/api/Rverifycode", verifycoderouter);
server.use("/api/Rcontactus", contactusrouter);
server.use("/api/Rsigninuser", signinrouter);
server.use("/api/RUserlogout", logoutrouter);
server.use("/api/RAdduseraddress", addAddressrouter);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running successfully at http://localhost:${port}`);
});
