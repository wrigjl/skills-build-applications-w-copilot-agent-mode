import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const rankings = await Leaderboard.find()
      .populate('user', 'fullName email')
      .sort({ rank: 1 })
      .lean();
    res.json({
      resource: 'leaderboard',
      rankings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default leaderboardRouter;
