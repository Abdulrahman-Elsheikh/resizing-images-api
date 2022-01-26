// Import Express Package
import express, { Application, Request, Response } from 'express';
// Import The Resizing Route
import route from './routes/route';

// Create App From Express
const app: Application = express();
// Create The Port
const port = 3000;

// Using The Resizing Route In The Application
app.use('/start', route);

// Create The Main GET Request
app.get('/', (_req: Request, res: Response) => {
  res.send(`Start Processing Your Image`);
});

// Make The Application Listen To The Port
app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`);
});

// Export The Application
export default app;
