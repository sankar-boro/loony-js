import { Application, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { pgClient } from './db.ts'

async function App() {
  const app = new Application();
  const router = new Router();
  router
    .get("/", (context) => {
      context.response.body = "Welcome to the home page!";
    })
    .get("/users", async (context) => {
      const result = await pgClient.queryArray("SELECT uid, fname, lname, email FROM USERS");
      const users = result.rows;
      context.response.body = users;
    });
  
  app.use(router.routes());
  app.use(router.allowedMethods());
  
  console.log("Oak server running on http://localhost:8000");
  await app.listen({ port: 8000 });
}

export { App }