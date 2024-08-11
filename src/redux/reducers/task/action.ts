import axiosServices from "@/config/axios-config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTasksAction = createAsyncThunk("task/getTasks", async () => {
  try {
    const response = await axiosServices.get("todos");
    return response.data;
  } catch (error: any) {
    throw error;
  }
});
