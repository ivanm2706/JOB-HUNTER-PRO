import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Job } from '../../types/JobType';
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

const URL = 'http://localhost:5000/api/jobs';

export const fetchJobs = createAsyncThunk<Job[], void, { rejectValue: string }>(
  'jobs/fetchJobs',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error('can not get jobs');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const deleteJob = createAsyncThunk<number, number>(
  'jobs/deleteJob',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('failed to delete');
      }

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
      const response = await fetch(URL + '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        throw new Error('failed to add new job.try later');
      }

      const newJob = await response.json();

      return newJob;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const updateJob = createAsyncThunk<number, Job>('jobs/updateJob', async (job, thunkAPI) => {
  try {
    const response = await fetch(`${URL}/${job.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });

    if (!response.ok) {
      throw new Error('failed update job');
    }

    const data = await response.json();
    return data;
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
