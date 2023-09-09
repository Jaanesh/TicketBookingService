import express, { type Response, type Request } from "express";

const PORT = 4000;

const app = express();
app.use(express.json());

app.use("*", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Payment is successful",
  });
});

app.listen(PORT);
console.log(`App started successfully on port=${PORT}`);
