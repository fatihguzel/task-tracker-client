import { ITask } from "@/types/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTasksAction } from "./action";

interface TaskState {
  tasks: ITask[] | undefined;
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

const task = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTasksAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasksAction.fulfilled, (state, action) => {
        state.tasks = action.payload.data;
        state.loading = false;
      })
      .addCase(getTasksAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default task.reducer;

export const { setTasks } = task.actions;
