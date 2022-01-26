import express from 'express';
import resize from './utilities/resize';

const route = express.Router();

route.use('/', resize);

route.get('/', async (req, res) => {
  const resizedImage = (await resize(req, res)) as unknown as string;
  console.log('resized');
  res.sendFile(resizedImage);
});

export default route;
