// redux/slice/user.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const userLogin = createAsyncThunk('userLogin', async ({ email, password }) => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.log(error);
    localStorage.removeItem('token');
    throw error;
  }
});

export const saveProfile = createAsyncThunk('saveProfile', async (token) => {
  const { data } = await api.get('/profile', {
    headers: { Authorization: token },
  });
  return { data, token };
});

const userSlice = createSlice({
  name: 'userData',
  initialState: {
    isLoading: false,
    isError: false,
    user: {}, // ✅ changed from [] to {}
    token: '',
    isLoggedin: false,
  },
  reducers: {
    logOut: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isLoggedin = false;
      state.token = '';
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedin = true;
        state.isError = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.isLoggedin = false;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedin = false;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedin = true;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
      })
      .addCase(saveProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
