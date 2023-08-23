import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import chatSlice from "./slice/ChatSlice";

const Store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
});

export default Store;
