// Import Supertest Package
import supertest from 'supertest';
// Import Application
import app from '../index';
// Import The Image Folder Name Function
import { getFolderName } from '../routes/utilities/getImagesFolder';
// Import The Path Package
import path from 'path';
// Import The fs-extra Package To Deal With File System
import fs from 'fs-extra';
// Import The Resizing Function
import { resizingImage } from '../routes/utilities/resizeFunc';

const request = supertest(app);

describe('Test Basic Endpoint Server', () => {
  it('Get The Endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});

describe('Test Resizing Route', () => {
  it('Resizing Route With No Queries', async () => {
    const response = await request.get('/start');
    expect(response.status).toBe(200);
    expect(response.text).toBe('You must enter a filename from the list');
  });
  it('Resizing Route With Invalid File Name', async () => {
    const response = await request.get('/start/?filename=nameOutSideTheList');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Please choose one of the listed images');
  });
  it('Resizing Route With Invalid File Name Type', async () => {
    const response = await request.get('/start/?filename=1313484');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Please choose one of the listed images');
  });
  it('Resizing Route Without Width Or Height', async () => {
    const response = await request.get('/start/?filename=fjord');
    const ImagesFolder = await getFolderName(__dirname);
    const resizedFolder = path.join(ImagesFolder, 'resized');
    const resizedImage = path.join(resizedFolder, 'fjord_Original.jpg');
    expect(response.status).toBe(200);
    expect(fs.existsSync(resizedImage)).toBeTruthy;
  });
  it('Resizing Route With Height & No Or Invalid Width', async () => {
    const response = await request.get('/start/?filename=fjord&height=100');
    const ImagesFolder = await getFolderName(__dirname);
    const resizedFolder = path.join(ImagesFolder, 'resized');
    const resizedImage = path.join(resizedFolder, 'fjord_H100.jpg');
    expect(response.status).toBe(200);
    expect(fs.existsSync(resizedImage)).toBeTruthy;
  });
  it('Resizing Route With Width & No Or Invalid Height', async () => {
    const response = await request.get('/start/?filename=fjord&width=100');
    const ImagesFolder = await getFolderName(__dirname);
    const resizedFolder = path.join(ImagesFolder, 'resized');
    const resizedImage = path.join(resizedFolder, 'fjord_W100.jpg');
    expect(response.status).toBe(200);
    expect(fs.existsSync(resizedImage)).toBeTruthy;
  });
  it('Resizing Route With Width & Height', async () => {
    const response = await request.get(
      '/start/?filename=fjord&width=100&height=100'
    );
    const ImagesFolder = await getFolderName(__dirname);
    const resizedFolder = path.join(ImagesFolder, 'resized');
    const resizedImage = path.join(resizedFolder, 'fjord_W100_H100.jpg');
    expect(response.status).toBe(200);
    expect(fs.existsSync(resizedImage)).toBeTruthy;
  });
});

describe('Test Resizing Function', () => {
  it('Resizing Without Width Or Height', async () => {
    const resizing = await resizingImage('palmtunnel', null, null);
    const ImagesFolder = await getFolderName(__dirname);
    const resizedFolder = path.join(ImagesFolder, 'resized');
    const resizedImage = path.join(resizedFolder, 'palmtunnel_Original.jpg');
    expect(resizing).toBe(resizedImage);
    expect(fs.existsSync(resizedImage)).toBeTruthy;
  });
  it('Resizing With Height & No Or Invalid Width', async () => {
    const resizing = await resizingImage('palmtunnel', null, 100);
    const ImagesFolder = await getFolderName(__dirname);
    const resizedFolder = path.join(ImagesFolder, 'resized');
    const resizedImage = path.join(resizedFolder, 'palmtunnel_H100.jpg');
    expect(resizing).toBe(resizedImage);
    expect(fs.existsSync(resizedImage)).toBeTruthy;
  });
  it('Resizing With Width & No Or Invalid Height', async () => {
    const resizing = await resizingImage('palmtunnel', 100, null);
    const ImagesFolder = await getFolderName(__dirname);
    const resizedFolder = path.join(ImagesFolder, 'resized');
    const resizedImage = path.join(resizedFolder, 'palmtunnel_W100.jpg');
    expect(resizing).toBe(resizedImage);
    expect(fs.existsSync(resizedImage)).toBeTruthy;
  });
  it('Resizing With Width & Height', async () => {
    const resizing = await resizingImage('palmtunnel', 100, 100);
    const ImagesFolder = await getFolderName(__dirname);
    const resizedFolder = path.join(ImagesFolder, 'resized');
    const resizedImage = path.join(resizedFolder, 'palmtunnel_W100_H100.jpg');
    expect(resizing).toBe(resizedImage);
    expect(fs.existsSync(resizedImage)).toBeTruthy;
  });
});

describe('Test Reset Route', () => {
  it('Reset The Application', async () => {
    const response = await request.get('/clear');
    expect(response.status).toBe(200);
    expect(response.text).toBe('The App has Reset');
  });
});
