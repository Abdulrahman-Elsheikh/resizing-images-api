// Import Express Package
import express from 'express';
// Import The Image Folder Name Function
import { getFolderName } from './utilities/getImagesFolder';
// Import The fs-extra Package To Deal With File System
import fs from 'fs-extra';
// Import The Path Package
import path from 'path';

// Create The Reset Route
const clear = express.Router();

clear.get(
  '/',
  async (_req: express.Request, res: express.Response): Promise<void> => {
    // Get The Images Folder
    const imagesFolderName: string = await getFolderName(__dirname);
    // Get The Resized Images Folder
    const resizedFolder: string = path.join(imagesFolderName, 'resized');
    // Get The Contents Of The Images Folder
    const imagesFolderContents: string[] = fs.readdirSync(imagesFolderName);
    // Get The Contents Of The Resized Images Folder
    const resizedFolderContents: string[] = fs.readdirSync(resizedFolder);

    // Check If The Resized Folder Exist & Delete It
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
  }
);

export default clear;
