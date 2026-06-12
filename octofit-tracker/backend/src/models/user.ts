import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fitnessLevel: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    weeklyGoal: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  },
  { timestamps: true }
);

const User = models.User ?? model('User', userSchema);

export default User;
