import userReducer from './userSlice';
import authReducer from './authSlice';
import nightModeReducer from './nightModeSlice';
import themeReducer from './themeSlice';
import pwaReducer from './pwaSlice';

export default {
  user: userReducer,
  auth: authReducer,
  nightMode: nightModeReducer,
  theme: themeReducer,
  pwa: pwaReducer,
};
