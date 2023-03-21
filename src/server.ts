import express, { Express, Request, Response } from "express";
import httpServerless from "serverless-http";
import cors from "cors";

const app: Express = express();

// map port
const port = 3000;

// handle and manage cross-origin calls
app.use(cors());

// handle and manage json requests
app.use(express.json());

// handle routes
app.use("/healthcheck", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello Server" });
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});

// export express server as a serverless http app
exports.handler = httpServerless(app);
