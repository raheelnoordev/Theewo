import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { getUploadsWriteDir } from '../utils/uploadsPaths.js';

const uploadsDir = getUploadsWriteDir();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const imageUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|pdf/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    cb(ext && mime ? null : new Error('Only image and PDF files are allowed.'), ext && mime);
  },
});

const videoUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /mp4|webm/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = /video\/(mp4|webm)/.test(file.mimetype);
    cb(ext && mime ? null : new Error('Only MP4 or WebM videos are allowed.'), ext && mime);
  },
});

const router = express.Router();

router.post('/image', authenticate, requireAdmin, imageUpload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, imageUrl: url });
});

router.post('/video', authenticate, requireAdmin, videoUpload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No video uploaded.' });
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, videoUrl: url });
});

export default router;
