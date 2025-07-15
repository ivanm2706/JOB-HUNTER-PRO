import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Job } from '../../types/JobType';
import axiosClient from '../../utils/axiosClient';
interface JobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk<Job[], undefined, { rejectValue: string }>(
  'jobs/fetchJobs',
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/jobs`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const deleteJob = createAsyncThunk<void, string>('jobs/deleteJob', async (id, thunkAPI) => {
  try {
    await axiosClient.delete(`/jobs/${id}`);
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const addJob = createAsyncThunk<Job, Omit<Job, 'id' | 'createdAt'>>(
  'jobs/addJob',
  async (job, thunkAPI) => {
    try {
      const response = await axiosClient.post('/jobs/', job);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const updateJob = createAsyncThunk<number, Job>('jobs/updateJob', async (job, thunkAPI) => {
  try {
    const response = await axiosClient.put(`/jobs/${job.id}`, job);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobs.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default jobsSlice.reducer;
