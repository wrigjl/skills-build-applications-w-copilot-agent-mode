import mongoose from 'mongoose';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase(): Promise<void> {
  // Seed the octofit_db database with test data
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri, { dbName: 'octofit_db' });

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const [summitTeam, pulseTeam, velocityTeam] = await Team.create([
    {
      name: 'Summit Striders',
      city: 'Seattle',
      captain: 'Avery Chen',
      membersCount: 4,
    },
    {
      name: 'Pulse Pack',
      city: 'Austin',
      captain: 'Jordan Brooks',
      membersCount: 3,
    },
    {
      name: 'Velocity Crew',
      city: 'Denver',
      captain: 'Samira Patel',
      membersCount: 5,
    },
  ]);

  const [avery, jordan, samira, diego, taylor] = await User.create([
    {
      fullName: 'Avery Chen',
      email: 'avery.chen@octofit.dev',
      fitnessLevel: 'advanced',
      weeklyGoal: 'Complete 5 endurance sessions',
      team: summitTeam._id,
    },
    {
      fullName: 'Jordan Brooks',
      email: 'jordan.brooks@octofit.dev',
      fitnessLevel: 'intermediate',
      weeklyGoal: 'Run 20 km this week',
      team: pulseTeam._id,
    },
    {
      fullName: 'Samira Patel',
      email: 'samira.patel@octofit.dev',
      fitnessLevel: 'advanced',
      weeklyGoal: 'Increase VO2 max training blocks',
      team: velocityTeam._id,
    },
    {
      fullName: 'Diego Martinez',
      email: 'diego.martinez@octofit.dev',
      fitnessLevel: 'beginner',
      weeklyGoal: 'Finish 3 guided workouts',
      team: summitTeam._id,
    },
    {
      fullName: 'Taylor Nguyen',
      email: 'taylor.nguyen@octofit.dev',
      fitnessLevel: 'intermediate',
      weeklyGoal: 'Hit 10,000 steps daily',
      team: pulseTeam._id,
    },
  ]);

  await Activity.create([
    {
      user: avery._id,
      type: 'Interval Run',
      durationMinutes: 42,
      caloriesBurned: 530,
      completedAt: new Date('2026-06-10T07:30:00Z'),
    },
    {
      user: jordan._id,
      type: 'Cycling',
      durationMinutes: 60,
      caloriesBurned: 610,
      completedAt: new Date('2026-06-11T13:20:00Z'),
    },
    {
      user: samira._id,
      type: 'HIIT Circuit',
      durationMinutes: 35,
      caloriesBurned: 480,
      completedAt: new Date('2026-06-11T18:10:00Z'),
    },
    {
      user: diego._id,
      type: 'Brisk Walk',
      durationMinutes: 30,
      caloriesBurned: 220,
      completedAt: new Date('2026-06-12T09:00:00Z'),
    },
    {
      user: taylor._id,
      type: 'Strength Training',
      durationMinutes: 50,
      caloriesBurned: 420,
      completedAt: new Date('2026-06-12T12:40:00Z'),
    },
  ]);

  await Workout.create([
    {
      title: 'Full Body Foundation',
      difficulty: 'beginner',
      durationMinutes: 30,
      targetMuscleGroups: ['legs', 'core', 'shoulders'],
      instructions: 'Perform 3 rounds of squats, planks, and shoulder presses.',
    },
    {
      title: 'Tempo Run Builder',
      difficulty: 'intermediate',
      durationMinutes: 40,
      targetMuscleGroups: ['legs', 'cardio'],
      instructions: 'Warm up 10 minutes, run 20 minutes at tempo pace, cool down 10 minutes.',
    },
    {
      title: 'Power HIIT Blast',
      difficulty: 'advanced',
      durationMinutes: 28,
      targetMuscleGroups: ['core', 'glutes', 'upper body'],
      instructions: 'Alternate 45s work and 15s rest across 5 explosive movements.',
    },
  ]);

  await Leaderboard.create([
    {
      user: samira._id,
      points: 1280,
      rank: 1,
      weekStartDate: new Date('2026-06-09T00:00:00Z'),
    },
    {
      user: avery._id,
      points: 1210,
      rank: 2,
      weekStartDate: new Date('2026-06-09T00:00:00Z'),
    },
    {
      user: jordan._id,
      points: 990,
      rank: 3,
      weekStartDate: new Date('2026-06-09T00:00:00Z'),
    },
    {
      user: taylor._id,
      points: 875,
      rank: 4,
      weekStartDate: new Date('2026-06-09T00:00:00Z'),
    },
    {
      user: diego._id,
      points: 710,
      rank: 5,
      weekStartDate: new Date('2026-06-09T00:00:00Z'),
    },
  ]);

  const [usersCount, teamsCount, activitiesCount, leaderboardCount, workoutsCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Leaderboard.countDocuments(),
    Workout.countDocuments(),
  ]);

  console.log('Seeding complete:', {
    usersCount,
    teamsCount,
    activitiesCount,
    leaderboardCount,
    workoutsCount,
  });

  await mongoose.disconnect();
}

void seedDatabase().catch(async (error) => {
  console.error('Failed to seed octofit_db:', error);
  await mongoose.disconnect();
  process.exit(1);
});
