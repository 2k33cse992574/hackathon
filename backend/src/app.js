import express from 'express';
import cors from 'cors';
import { anonymousUser } from './middleware/anonymousUser.js';

import caseRoutes from './routes/case.routes.js';
import voteRoutes from './routes/vote.routes.js';
import resultRoutes from './routes/result.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(anonymousUser);

app.use('/api', caseRoutes);
app.use('/api', voteRoutes);
app.use('/api', resultRoutes);

export default app;
