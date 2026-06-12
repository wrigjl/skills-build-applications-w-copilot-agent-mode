import { Schema, model, models } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekStartDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Leaderboard = models.Leaderboard ?? model('Leaderboard', leaderboardSchema);

export default Leaderboard;
