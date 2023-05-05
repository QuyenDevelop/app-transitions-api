import express from "express";
const app = express();
const hostName = "localhost";
const port = 3000;
app.get("/", (_req, res) => {
    res.end("Hello world!");
});
app.listen(port, hostName, () => {
    console.log("This is my first time");
});
//# sourceMappingURL=index.js.map