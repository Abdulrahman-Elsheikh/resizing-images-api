// Import Sharp Package
import sharp from 'sharp';
// Import Path Package
import path from 'path';
// Import Get Folder Name Function
import { getFolderName } from './getImagesFolder';
// Import Creating Resized Images Folder Function
import { createResizedFolder } from './createResizedFolder';

// Start The Resizing Function
export const resizingImage = async (
  image: string,
  width: number | null,
  height: number | null
): Promise<string> => {
  const imageName: string = image + '.jpg';
  const imageFolder: string = await getFolderName(__dirname);
  const imagePath: string = path.join(imageFolder, imageName);
  const resizedFolder: string = await createResizedFolder();
  let resizedImage = `${image}_W${width}_H${height}.jpg`;
  let resizedImagePath: string = path.join(resizedFolder, resizedImage);
  // Check If The Required Width & Height Exists
  if (!width && !height) {
    width = null;
    height = null;
    resizedImage = `${image}_Original.jpg`;
    resizedImagePath = path.join(resizedFolder, resizedImage);
  }
  // Condition Of Missing The Required Width
  else if (!width || isNaN(width)) {
    width = null;
    resizedImage = `${image}_H${height}.jpg`;
    resizedImagePath = path.join(resizedFolder, resizedImage);
  }
  // Condition Of Missing The Required Height
  else if (!height || isNaN(height)) {
    height = null;
    resizedImage = `${image}_W${width}.jpg`;
    resizedImagePath = path.join(resizedFolder, resizedImage);
  }
  await sharp(imagePath).resize(width, height).toFile(resizedImagePath);
  return resizedImagePath;
};
