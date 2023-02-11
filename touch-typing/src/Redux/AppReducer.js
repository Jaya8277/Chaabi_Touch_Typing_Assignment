const initState = {
  presentText: "",
  wpm: 0,
  accuracy: 0,
  pressedkey: 0,
  wpmIn5: 0,
};

function AppReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE": {
      return { ...state, presentText: payload };
    }
    case "SHOW": {
      return { ...state, wpm: payload.wpm, accuracy: payload.accuracy };
    }
    case "5MIN": {
      return {
        ...state,
        pressedkey: payload.totalCharacterTyped,
        wpmIn5: payload.WPM,
      };
    }

    default:
      return state;
  }
}
export { AppReducer };
