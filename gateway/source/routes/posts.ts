import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();

router.get('/posts', controller.getPosts);
router.post('/addPosts', controller.addPost);

export = router;
