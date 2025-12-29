import {createServer} from "node:http";
import app from "./app.js";
import env from "./config/env.js";
import {connectDB} from "./config/db.js";

async function startServer() {
    try {
        // Connect to the database
        await connectDB();

        // Create the server
        const server = createServer(app);

        // Start the server
        server.listen(env.PORT, () => {
            console.log(`Server started on port ${env.PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

startServer();