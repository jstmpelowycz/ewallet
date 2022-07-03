import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    userId: {},
    userData: {},
    expenses: [],
    totalExpenses: 0,
  },

  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },

    setUserData(state, action) {
      state.userData = action.payload;
    },

    setTotalExpenses(state, action) {
      state.totalExpenses = action.payload;
    },

    setAllExpenses(state, action) {
      state.expenses = action.payload;
    },

    addExpense(state, action) {
      state.expenses.push(action.payload);
    },

    logoutUser(state) {
      state.userId = "";
      state.userData = "";
      state.expenses = [];
      state.totalExpenses = 0;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
