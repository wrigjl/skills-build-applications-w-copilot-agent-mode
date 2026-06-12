import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes';

dotenv.config();

const app = express();
const port = 8000;
const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const apiBaseUrl = `${baseUrl}/api`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    apiBaseUrl,
  });
});

app.use('/api', apiRouter);

async function startServer(): Promise<void> {
  try {
    await mongoose.connect(mongoUri, { dbName: 'octofit_db' });
    app.listen(port, () => {
      console.log(`OctoFit backend running on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
