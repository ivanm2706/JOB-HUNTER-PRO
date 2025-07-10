export type Job = {
  id: number;
  position: string;
  company: string;
  status: 'applied' | 'interview' | 'rejected';
  createdAt: string;
};
