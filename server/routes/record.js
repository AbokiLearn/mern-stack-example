import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  //Your code goes here
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  //Your code goes here
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  //Your code goes here
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  //Your code goes here
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  //Your code goes here
});

export default router;
