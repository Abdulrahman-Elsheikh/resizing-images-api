import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome');
});

app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`);
});

export default app;
