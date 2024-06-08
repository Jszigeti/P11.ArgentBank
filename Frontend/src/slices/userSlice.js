import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Send IDs to API and return token
export const login = createAsyncThunk(
  "user/login",
  async (ids, { dispatch }) => {
    const res = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      ids
    );
    // Dispatch user data to the store
    dispatch(getUserData(res.data.body.token));
    return res.data.body.token;
  }
);

// Register a new account
export const register = createAsyncThunk("user/register", async (ids) => {
  const res = await axios.post("http://localhost:3001/api/v1/user/signup", ids);
  return res.data.body.token;
});

// Send token to API and return userData
const getUserData = createAsyncThunk("user/getUserData", async (token) => {
  const res = await axios.post(
    "http://localhost:3001/api/v1/user/profile",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.body;
});

// Send new username and token to API and update the state
export const editUserName = createAsyncThunk(
  "user/editUserName",
  async ({ username, token }) => {
    const res = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      username,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.body;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userData: {},
    editMode: false,
  },
  // Non-API related actions
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userData = {};
    },
    editMode(state, action) {
      state.editMode = action.payload;
    },
  },
  // Thunk actions
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.token = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loginStatus = "failed";
      })
      .addCase(register.fulfilled, (state) => {
        state.registerStatus = "succeeded";
      })
      .addCase(register.rejected, (state) => {
        state.registerStatus = "failed";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(editUserName.fulfilled, (state, action) => {
        state.userData = action.payload;
      });
  },
});

export const { logout, editMode } = userSlice.actions;

export default userSlice.reducer;
