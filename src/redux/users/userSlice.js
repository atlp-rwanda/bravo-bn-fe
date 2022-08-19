import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];

export const updateUserRoleAsync = createAsyncThunk(
  'user/update',
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const res = await axios.put(`${process.env.API_URL}/user/roles`, {email : data.email, role: data.role},{
        headers: { Authorization: `Bearer ${jwtToken}` },   
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const getUsersAsync = createAsyncThunk(
  'user/getUsers',
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.API_URL}/user`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
) 

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading : false,
  },
  reducers: {
    getUsers: (state, action) => {
      state.users = [action.payload];
    },
  },
  extraReducers : (builder => {
        builder.addCase(updateUserRoleAsync.fulfilled, (state, action)=> {
          state.users = state.users.map(user => {
              if(user.email === action.payload.email)
              {
                return {
                  ...user,
                  role : action.payload.role
                }
              }
              else 
              {
                return user;
              }
          })
          state.loading  = false;
        })

        builder.addCase(updateUserRoleAsync.pending, (state, action)=> {
          state.loading  = true;
        })

        builder.addCase(getUsersAsync.fulfilled, (state, action)=> {
          state.users = action.payload.sort(function(a, b){return a.id - b.id});
          state.loading  = false;
        })
        
        builder.addCase(getUsersAsync.pending, (state, action)=> {
          state.loading  = true;
        })
  })
});

export const { getUsers } = usersSlice.actions;
export const showUser = (state) => state.users.data;
export default usersSlice.reducer;