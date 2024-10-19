import { userIDdata } from '@/api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	AdminData: {} as userIDdata | null,
};

const reduxState = createSlice({
	name: 'pollAppAdmin',
	initialState,
	reducers: {
		setAdminID: (state, { payload }: PayloadAction<userIDdata>) => {
			state.AdminData = payload;
		},
		Adminlogout: (state) => {
			state.AdminData = null;
		},
	},
});

export const { setAdminID, Adminlogout } = reduxState.actions;

export default reduxState.reducer;
