import { createAction, props } from "@ngrx/store";

export const uploadText = createAction(
  "[Upload Step] Upload Text",
  props<{ text: Blob }>
);
export const uploadAudio = createAction(
  "[Upload Step] Upload Audio",
  props<{ audio: Blob }>
);
export const setLanguage = createAction(
  "[Upload Step] Set Language",
  props<{ language: string }>
);
