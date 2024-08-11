import axiosServices from "@/config/axios-config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAction = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axiosServices.post("auth/login", data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUserInfoAction = createAsyncThunk(
  "auth/getUserInfo",
  async () => {
    try {
      const response = await axiosServices.get("auth/profile");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
);
