import express, { Application, Request, Response } from 'express';
// import { getFolderName } from './routes/utilities/getimages';
// import path from 'path';
import route from './routes/route';
// import resize from './routes/utilities/resize';

const app: Application = express();
const port = 3000;

app.use('/start', route);

app.get('/', (req: Request, res: Response) => {
  res.send(`Start Processing Your Image`);
});

app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`);
});

export default app;
