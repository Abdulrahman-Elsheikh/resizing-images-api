import express from 'express';
// import { getFolderName } from './utilities/getImagesFolder';
// import { createResizedFolder } from './utilities/createResizedFolder';
// import path from 'path';
import resize from './utilities/resize';

const route = express.Router();

route.use('/', resize);

/*
route.get('/', resize, async (req, res) => {
  const folderName = await getFolderName(__dirname);
  const resizedFolder = await createResizedFolder();
  const resizedImage: string = path.join(
    resizedFolder,
    `${req.query.filename}_${req.query.width}_${req.query.height}.jpg`
  );
  res.sendFile(resizedImage);
  console.log(resizedImage);
});
*/

route.get('/', async (req, res) => {
  const resizedImage = (await resize(req, res)) as unknown as string;
  console.log('resized');
  res.sendFile(resizedImage);
});

/*
route.get('/', resize, async (req, res) => {
  // const resizedImage = (await getResizedImage()) as unknown as string;
  // res.sendFile(resizedImage);
  console.log('resized');
});
*/
export default route;
