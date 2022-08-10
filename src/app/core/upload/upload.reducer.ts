import { createReducer, on } from "@ngrx/store";

import { setLanguage, uploadAudio, uploadText } from "./upload.actions";

export const initialState = {
  language: "und",
  text: "",
  audio: null,
};

export const uploadReducer = createReducer(
  initialState,
  on(setLanguage, uploadAudio, uploadText, (state, action) => ({
    ...state,
    ...action,
  }))
);
