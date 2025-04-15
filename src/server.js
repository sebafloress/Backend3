import app from './app.js';
import { disconnectDB } from './config/database.js';

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', async () => {
    await disconnectDB();
    server.close();
});