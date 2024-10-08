// Import necessary modules
import { Application, Router } from "https://deno.land/x/oak@v17.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

// Create a new Oak application
const app = new Application();
const router = new Router();

// Define a route for WebSocket connections
router.get("/ws", async (context) => {
    if (context.isUpgradable) {
        const ws = await context.upgrade();
        console.log("WebSocket connected");

        ws.onopen = () => {
            console.log("Client connected");
        };

        ws.onmessage = (message) => {
            console.log("Received message:", message.data);
            // Echo the message back to the client
            ws.send(`Echo: ${message.data}`);
        };

        ws.onclose = () => {
            console.log("Client disconnected");
        };
    }
});

// Use the router and set up the app
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const port = 8000;
console.log(`Server is running on http://localhost:${port}`);
app.use(oakCors()); // Enable CORS for All Routes
await app.listen({ port });
