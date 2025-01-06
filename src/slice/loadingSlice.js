import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
};

export const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export const { setIsLoading } = loadingSlice.actions; // 用於在組件或其他地方調用 setLoading action，以便觸發狀態更新。

export default loadingSlice.reducer; // 用於在 Redux store 中註冊這個 reducer。
