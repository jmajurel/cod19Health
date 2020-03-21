import express from "express";

const app = express();
const PORT = process.env.PORT || 8081;
app.get("/", (req, res) => {
  return res.send("hello world!");
});
app.listen(PORT, () => {
  console.log("cod19Health is listenning on port: ", PORT);
});
