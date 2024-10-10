import { Pool } from "npm:pg";
import process from "node:process";
import dotenv from "dotenv";
dotenv.config({ path: "../../config/.env" });

const pg_username = process.env.PG_USERNAME;
const pg_hostname = process.env.PG_HOSTNAME;
const pg_database = process.env.PG_DATABASE;
const pg_password = process.env.PG_PASSWORD;
const pg_port = process.env.PG_PORT;

console.log({
    pg_username,
    pg_hostname,
    pg_database,
    pg_password,
    pg_port,
});

// Database connection configuration
export const pg_pool = new Pool({
    user: pg_username,
    host: pg_hostname,
    database: pg_database,
    password: pg_password,
    port: pg_port,
});
