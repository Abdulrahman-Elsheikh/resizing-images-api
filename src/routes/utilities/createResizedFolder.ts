import { getFolderName } from './getImagesFolder';
import fs from 'fs-extra';
import path from 'path';

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
