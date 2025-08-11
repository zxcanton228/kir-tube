import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useSelector } from 'react-redux'

import { authSlice } from './auth.slice'

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer
	}
})

type TRootState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector
