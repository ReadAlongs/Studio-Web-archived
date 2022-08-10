export interface AppState {
  text: Readonly<string | File>;
  language: Readonly<string>;
  audio: Readonly<File>;
  alignment: Readonly<XMLDocument>;
  xml: Readonly<XMLDocument>;
  tourTaken: Readonly<boolean>;
  storeInLocalStorage: Readonly<boolean>;
  permissionsGranted: Readonly<boolean>;
  decoderInitialized: Readonly<boolean>;
  decoding: Readonly<boolean>;
  currentStep: Readonly<number>;
}
