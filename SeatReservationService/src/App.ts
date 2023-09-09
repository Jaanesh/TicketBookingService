import express, { type Response, type Request } from "express";

const PORT = 5000;

const app = express();
app.use(express.json());

app.use("*", (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json({
      message: "Seat reservation is successful",
    });
  }, 200);
});

app.listen(PORT);
console.log(`App started successfully on port=${PORT}`);
