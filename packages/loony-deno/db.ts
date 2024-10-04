import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import "jsr:@std/dotenv/load";

const pg_username   = Deno.env.get("PG_USERNAME");
const pg_hostname   = Deno.env.get("PG_HOSTNAME");
const pg_database   = Deno.env.get("PG_DATABASE");
const pg_password   = Deno.env.get("PG_PASSWORD");
const pg_port       = Deno.env.get("PG_PORT");
const pg_cert       = Deno.env.get("PG_CERTIFICATE") || "";

const pgClient = new Client({
    user: pg_username,
    database: pg_database,
    hostname: pg_hostname,
    port: pg_port,
    password: pg_password,
    tls: {
        caCertificates: [pg_cert],
        enabled: false
    }
});

await pgClient.connect()

export { pgClient }

// await client.connect();
// await client.end();
// deno run --allow-net --allow-read mod.ts