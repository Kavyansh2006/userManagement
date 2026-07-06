import { createSlice } from "@reduxjs/toolkit";

//  Load from localStorage initially
const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    //  ADD USER
    addUser: (state, action) => {
      state.users.push(action.payload);

      //  Save to localStorage
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    //  DELETE USER
    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );

      //  Save to localStorage
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    //  UPDATE USER (EDIT)
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      if (index !== -1) {
        state.users[index] = action.payload;
      }

      //  Save to localStorage
      localStorage.setItem("users", JSON.stringify(state.users));
    },

  },
});

export const { addUser, deleteUser, updateUser } =
  userSlice.actions;

export default userSlice.reducer;