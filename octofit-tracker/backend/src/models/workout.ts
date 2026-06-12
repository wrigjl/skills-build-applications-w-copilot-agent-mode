import { Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetMuscleGroups: [{ type: String, required: true, trim: true }],
    instructions: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Workout = models.Workout ?? model('Workout', workoutSchema);

export default Workout;
