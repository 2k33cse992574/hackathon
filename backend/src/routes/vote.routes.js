import express from 'express';
import { getVoteTask, submitVote } from '../controllers/vote.controller.js';

const router = express.Router();

router.get('/get-vote-task', getVoteTask);   // ✅ THIS WAS MISSING
router.post('/submit-vote', submitVote);

export default router;
