import { Router } from 'express';
import Activity from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const items = await Activity.find()
      .populate('user', 'fullName email')
      .sort({ completedAt: -1 })
      .lean();
    res.json({
      resource: 'activities',
      items,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default activitiesRouter;
