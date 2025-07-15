import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, enum: ['applied', 'interview', 'rejected'], default: 'applied' },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
