import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Job } from '../../types/JobType';

type JobStatsProps = {
  jobs: Job[];
};

export default function JobStats({ jobs }: JobStatsProps) {
  const getStatsData = () => {
    const counts = {
      applied: 0,
      interview: 0,
      rejected: 0,
    };

    jobs.forEach((job) => {
      counts[job.status]++;
    });

    return [
      { name: 'Applied', value: counts.applied },
      { name: 'Interview', value: counts.interview },
      { name: 'Rejected', value: counts.rejected },
    ];
  };

  return (
    <div className="mb-5">
      <h5 className="mb-3">Applications Overview</h5>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={getStatsData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#17a2b8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
