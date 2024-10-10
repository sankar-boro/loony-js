import express, { Request, Response } from "npm:express";
import { pg_pool } from "./db.ts";

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});
app.get("/users", async (_req: Request, res: Response) => {
  try {
    const result = await pg_pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
