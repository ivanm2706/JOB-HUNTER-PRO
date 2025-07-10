import { addMockJob, deleteMockJob, mockJobsData, updateMockJob } from '../../json/jobs';
import type { Job } from '../../types/JobType';

export async function getJobs(): Promise<Job[]> {
  // const response = await fakeFetch<Job[]>('/api/jobs');

  return new Promise<Job[]>((res, rej) => {
    setTimeout(async () => {
      const reject = false;

      if (reject) {
        rej(new Error('Failed to fetch jobs'));
      }

      res(mockJobsData.data);
    }, 300);
  });
}

export async function addJobAPI(jobData: Omit<Job, 'id' | 'createdAt'>): Promise<Job> {
  // const response = await fakeFetch<Job>('/api/jobs', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(jobData),
  // });

  const newJob: Job = {
    ...jobData,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };

  return new Promise<Job>((res, rej) => {
    setTimeout(() => {
      const reject = false;
      addMockJob(newJob);

      if (reject) {
        rej(new Error('Failed to add new job'));
      }

      res(newJob);
    }, 100);
  });
}

export async function deleteJobAPI(id: number): Promise<string> {
  // const response = await fakeFetch(`/api/jobs/${id}`, {
  //   method: 'DELETE',
  // });

  return new Promise<string>((res, rej) => {
    setTimeout(async () => {
      const reject = false;

      if (reject) {
        rej(new Error('Failed to add new job'));
      }

      deleteMockJob(id);

      res('success');
    }, 100);
  });
}

export async function updateJobAPI(id: number, data: Partial<Job>): Promise<Partial<Job>> {
  // const response = await fakeFetch<Job>(`/api/jobs/${id}`, {
  //   method: 'PUT',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify(data),
  // });

  return new Promise<Partial<Job>>((res, rej) => {
    setTimeout(async () => {
      const reject = false;

      if (reject) {
        rej(new Error('Failed to update job'));
      }

      updateMockJob(id, data);

      res(data);
    }, 100);
  });
}
