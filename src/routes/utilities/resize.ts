import express from 'express';
import { getFolderName } from './getImagesFolder';
import { createResizedFolder } from './createResizedFolder';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs-extra';

const resize = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const folderName = await getFolderName(__dirname);
  const resizedFolder = await createResizedFolder();
  const fileName = `${req.query.filename as string}.jpg`;
  const reqWidth: number = parseInt(req.query.width as string);
  const reqHeight: number = parseInt(req.query.height as string);
  const resizedImage = `${
    req.query.filename as string
  }_${reqWidth}_${reqHeight}.jpg`;
  const resizedImagePath = path.join(resizedFolder, resizedImage);

  if (fs.existsSync(resizedImagePath)) {
    res.sendFile(resizedImagePath);
  } else {
    await sharp(path.join(folderName, fileName))
      .resize(reqWidth, reqHeight)
      .toFile(resizedImagePath);
    res.sendFile(resizedImagePath);
  }
};

export default resize;
