import { Application, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { getPostgresClient } from './db.ts'
import { getAppConfig, Config } from './init.ts'

async function App(config: Config) {
  
  const app = new Application();
  const router = new Router();
  const pgClient = await getPostgresClient(config.postgres);
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
  
  Deno.addSignalListener("SIGINT", () => {
    pgClient.end();
    Deno.exit();
  });

  console.log(`Loony server running on http://localhost:${config.app.port}`);
  await app.listen({ port: config.app.port });

}

export { App, getAppConfig }