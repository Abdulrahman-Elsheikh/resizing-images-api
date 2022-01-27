// Import Express Package
import express, { Application, Request, Response } from 'express';
// Import The Resizing Route
import route from './routes/route';
// Import The Clear Route
import clear from './routes/clear';

// Create App From Express
const app: Application = express();
// Create The Port
const port = 3000;

// Using The Resizing Route In The Application
app.use('/start', route);

// Reset The Application Using Clear Route
app.use('/clear', clear);

const welcomeMessage = `
Welcome To Image Process Application
* To Start Resizing, Please Follow the Instructions:
1. Add /start/ to The URL
2. Insert An Image Name From The List Using ?filename=......
   * encenadaport
   * fjord
   * icelandwaterfall
   * palmtunnel
   * santamonica
3. Insert The Required Dimensions For Your Image Using &width=...&height=...

Example URL : http://localhost:3000/start/?filename=fjord&width=200&height=200

* Instructions:
  1. File Name Must Be String, LowerCase & From The List.
  2. The Dimensions Are Required Both Or One Of Them
  3. To Reset Your Application Use /clear After The Main Server URL.
  `;

// Create The Main GET Request
app.get('/', (_req: Request, res: Response) => {
  res.send(welcomeMessage);
});

// Make The Application Listen To The Port
app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`);
});

// Export The Application
export default app;
