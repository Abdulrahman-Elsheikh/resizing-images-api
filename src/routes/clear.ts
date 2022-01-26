// Import Express Package
import express from 'express';
// Import The Image Folder Name Function
import { getFolderName } from './utilities/getImagesFolder';
// Import The fs-extra Package To Deal With File System
import fs from 'fs-extra';
// Import The Path Package
import path from 'path';

const clear = express.Router();

clear.get('/', async (_req, res) => {
  const imagesFolderName = await getFolderName(__dirname);

  const resizedFolder = path.join(imagesFolderName, 'resized');

  const imagesFolderContents: string[] = fs.readdirSync(imagesFolderName);

  const resizedFolderContents: string[] = fs.readdirSync(resizedFolder);

  if (imagesFolderContents.includes('resized')) {
    for (let i = 0; i < resizedFolderContents.length; i++) {
      const resizedImage = path.join(resizedFolder, resizedFolderContents[i]);
      await fs.unlink(resizedImage);
    }
    await fs.rmdir(resizedFolder);
    res.send('The App has Reset');
  } else {
    res.send('The App Already Reset');
  }
});

export default clear;
