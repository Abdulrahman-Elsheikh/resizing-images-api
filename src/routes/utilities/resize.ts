// Import Express Package
import express from 'express';
// Import The Image Folder Name Function
import { getFolderName } from './getImagesFolder';
// Import The Function For Creating New Resized Image Folder
import { createResizedFolder } from './createResizedFolder';
// Import Sharp Package To Resize Images
import sharp from 'sharp';
// Import The Path Package
import path from 'path';
// Import The fs-extra Package To Deal With File System
import fs from 'fs-extra';

// Create Resize Function
const resize = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  // Get The Image Folder Name
  const folderName = await getFolderName(__dirname);
  // Get The Listed Images Names
  const listedImages = fs.readdirSync(folderName);
  // Create The Resized Images Folder
  const resizedFolder = await createResizedFolder();
  // Get The Required Image To Resize
  const fileName = `${req.query.filename as string}.jpg`;
  // Get The Required Width To Resize
  let reqWidth: number | null = parseInt(req.query.width as string);
  // Get The Required Height To Resize
  let reqHeight: number | null = parseInt(req.query.height as string);
  // Create The Resized Image
  let resizedImage = `${
    req.query.filename as string
  }_W${reqWidth}_H${reqHeight}.jpg`;
  // Get The Resized Image Path
  let resizedImagePath = path.join(resizedFolder, resizedImage);

  // Check If The File Name Exists
  if (req.query.filename === undefined) {
    res.send('You must enter a filename from the list');
  }
  // Check If The Image From The List
  else if (!listedImages.includes(fileName)) {
    res.send('Please choose one of the listed images');
  } else {
    // Check If The Required Width & Height Exists
    if (!reqWidth && !reqHeight) {
      res.send('Restart The Server & Please enter a width and height');
    }
    // Condition Of Missing The Required Width
    else if (!reqWidth || isNaN(reqWidth)) {
      reqWidth = null;
      resizedImage = `${req.query.filename as string}_H${reqHeight}.jpg`;
      resizedImagePath = path.join(resizedFolder, resizedImage);
    }
    // Condition Of Missing The Required Height
    else if (!reqHeight || isNaN(reqHeight)) {
      reqHeight = null;
      resizedImage = `${req.query.filename as string}_W${reqWidth}.jpg`;
      resizedImagePath = path.join(resizedFolder, resizedImage);
    }
    // Check If The Resized Image Already Exists
    if (fs.existsSync(resizedImagePath)) {
      res.sendFile(resizedImagePath);
    }
    // Resizing The Required Image
    else {
      await sharp(path.join(folderName, fileName))
        .resize(reqWidth, reqHeight)
        .toFile(resizedImagePath);
      res.sendFile(resizedImagePath);
    }
  }
};

// Export The Resizing Function
export default resize;
