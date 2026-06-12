import { Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    captain: { type: String, required: true, trim: true },
    membersCount: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

const Team = models.Team ?? model('Team', teamSchema);

export default Team;
