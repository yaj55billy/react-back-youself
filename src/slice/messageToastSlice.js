import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const messageToastSlice = createSlice({
	name: "messageToast",
	initialState: [],
	reducers: {
		addMessageToast: (state, action) => {
			if (action.payload.success) {
				state.push({
					id: action.payload.id,
					type: "success",
					title: "成功",
					content: action.payload.message,
				});
			} else {
				state.push({
					id: action.payload.id,
					type: "error",
					title: "失敗",
					content: Array.isArray(action.payload.message)
						? action.payload.message.join("、")
						: action.payload.message,
				});
			}
		},
		removeMessageToast: (state, action) => {
			const index = state.findIndex((toast) => toast.id === action.payload);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},
	},
});

export const addAsyncMessageToast = createAsyncThunk(
	"messageToast/addAsyncMessageToast",
	async function (payload, { dispatch, requestId }) {
		dispatch(
			messageToastSlice.actions.addMessageToast({
				...payload,
				id: requestId,
			})
		);

		setTimeout(() => {
			dispatch(messageToastSlice.actions.removeMessageToast(requestId));
		}, 3000);
	}
);

export const { addMessageToast, removeMessageToast } =
	messageToastSlice.actions;
export default messageToastSlice.reducer;
