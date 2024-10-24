import express, { Application, Response, Request } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { sendMail } from "./config/mail.js"; // Ensure the path is correct

// Resolve __dirname since it's not available in ES modules by default
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app: Application = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// Define a route to send email
app.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    // Render the EJS email template
    const html = await ejs.renderFile(
      path.join(__dirname, "./views/emails/welcome.ejs"),
      {
        name: "Sam",
      }
    );

    // Send email using the sendMail function
    await sendMail("norosiw842@adosnan.com", "Testing SMTP", html);

    // Send a response confirming success
    return res.json({ msg: "Email sent successfully" });
  } catch (error) {
    // Handle errors during email sending or template rendering
    console.error("Error sending email: ", error);
    return res.status(500).json({ msg: "Failed to send email" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
