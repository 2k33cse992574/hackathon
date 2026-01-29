import express from 'express';
import { createCase } from '../controllers/case.controller.js';

const router = express.Router();
router.post('/create-case', createCase);
export default router;