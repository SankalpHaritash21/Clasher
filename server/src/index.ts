import express, { Application, Response, Request } from "express";
import "dotenv/config";

const app: Application = express();
const PORT = process.env.PORT || 7000;

app.get("/", (req: Request, res: Response): any => {
  return res.send("SEVER working");
});

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
