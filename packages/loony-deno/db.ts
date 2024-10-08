import { Client, ClientOptions } from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import "jsr:@std/dotenv/load";

async function getPostgresClient(config: ClientOptions) {
    const pgClient = new Client(config);
    await pgClient.connect()
    return pgClient
}

export { getPostgresClient }

// await client.connect();
// await client.end();
// deno run --allow-net --allow-read mod.ts