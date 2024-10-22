import express, { Application, Response, Request } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const app: Application = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve(_dirname, "./views"));

app.get("/", (req: Request, res: Response): any => {
  return res.render("Welcome");
});

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
