import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

interface Post {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}
const pathJson = path.join(__dirname, '../data.json');

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  console.log('getPosts');
  fs.readFile(pathJson, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    return res.status(200).json(JSON.parse(data));
  });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  console.log('addPost');
  // get the data from req.body
  let title: string = req.body.title;
  let body: string = req.body.body;
  let userId: number = req.body.userId;
  let id: number = req.body.id;
  const post = {
    id,
    userId,
    title,
    body,
  };
  fs.readFile(pathJson, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    const newData = {
      ...JSON.parse(data),
    };

    newData.posts.push(post);
    fs.writeFile(pathJson, JSON.stringify(newData), (err) => {
      if (err) {
        throw err;
      }
      return res.status(200).json({
        message: 'Post Added',
      });
    });
  });
};

export default { getPosts, addPost };
