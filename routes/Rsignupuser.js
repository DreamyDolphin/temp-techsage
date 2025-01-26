// import express from  "express";
// const signuprouter=express.Router();
// import { UserSignup } from "../controllers/UsersignupC.js";

// // now calling api

// signuprouter.post('/usersignup',UserSignup);

// export default signuprouter;

import express from "express";
const router = express.Router();

router.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL || "https://techsagelabs.in");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).send(); // Respond to preflight request
});

router.post("/usersignup", async (req, res) => {
  try {
    // Your signup logic here
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
