export type Job = {
  id: string;
  userId: string;
  position: string;
  company: string;
  status: 'applied' | 'interview' | 'rejected';
  createdAt: string;
};
