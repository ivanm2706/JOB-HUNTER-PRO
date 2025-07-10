import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Job } from '../../types/JobType';
import { addJobAPI, deleteJobAPI, getJobs, updateJobAPI } from './jobsAPI';
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

export const fetchJobs = createAsyncThunk<Job[], void, { rejectValue: string }>(
  'jobs/fetchJobs',
  async (_, thunkAPI) => {
    try {
      const response = await getJobs();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const deleteJob = createAsyncThunk<number, number>(
  'jobs/deleteJob',
  async (id, thunkAPI) => {
    try {
      await deleteJobAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const addJob = createAsyncThunk<Job, Omit<Job, 'id' | 'createdAt'>>(
  'jobs/addJob',
  async (job, thunkAPI) => {
    try {
      const response = await addJobAPI(job);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const updateJob = createAsyncThunk<number, Job>('jobs/updateJob', async (job, thunkAPI) => {
  try {
    await updateJobAPI(job.id, job);
    return job.id;
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
        console.log(action);
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default jobsSlice.reducer;
