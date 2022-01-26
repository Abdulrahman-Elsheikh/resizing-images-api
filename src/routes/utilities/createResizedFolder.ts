// Import The Image Folder Name Function
import { getFolderName } from './getImagesFolder';
// Import The fs-extra Package To Deal With File System
import fs from 'fs-extra';
// Import The Path Package
import path from 'path';

// Create The Resized Images Folder
export const createResizedFolder = async (): Promise<string> => {
  const folderName = await getFolderName(__dirname);
  let resizedFolder = '';
  const folderContents: string[] = fs.readdirSync(folderName);
  if (folderContents.includes('resized')) {
    resizedFolder = path.join(folderName, 'resized');
    return resizedFolder;
  } else {
    resizedFolder = fs.ensureDir(
      path.join(folderName, 'resized')
    ) as unknown as string;
    return resizedFolder;
  }
};
