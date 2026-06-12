import { Router } from 'express';
import Workout from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const items = await Workout.find().lean();
    res.json({
      resource: 'workouts',
      items,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default workoutsRouter;
