// Import Express Package
import express from 'express';
// Import The Resizing Function
import resize from './utilities/resize';

// Create The Route Of Resizing
const route = express.Router();

// Use The Resizing Function In The Route
route.use('/', resize);

// Create GET Request
route.get('/', async (req, res) => {
  const resizedImage = (await resize(req, res)) as unknown as string;
  console.log('resized');
  res.sendFile(resizedImage);
});

// Export The Resizing Route
export default route;
