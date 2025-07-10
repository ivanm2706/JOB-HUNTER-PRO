import type { Job } from '../types/JobType';

export const filteredJobs = (jobs: Job[], search: string, status: string) => {
  return jobs.filter((job1) => {
    const matchesSearch =
      job1.position.toLowerCase().includes(search.toLowerCase()) ||
      job1.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status ? job1.status === status : true;

    return matchesSearch && matchesStatus;
  });
};
