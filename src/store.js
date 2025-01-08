import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "@/slice/loadingSlice";
import messageToastReducer from "@/slice/messageToastSlice";

export const store = configureStore({
	reducer: {
		loader: loadingSlice,
		message: messageToastReducer,
	},
});
