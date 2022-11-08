// here goes the store
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    // aca van los slices, de la carpeta ../slices
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 