import set from 'lodash.set';
import { appConfig } from '../config';

const UPDATE = '@appstate/UPDATE';

const initialState = parseState({
  appConfig,
  results: {
    // [kestionNumber]: questionAnswer
    // the answer can be a profile (BBA, KBA, ABA) or other field result for fields with customMauticField defined
  },
  currentQuestion: 1,
  customMauticFields: {}
});

// Redux session reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE: {
      // update the state using lodash.set dot notation
      const newState = set(state, action.path, action.value);
      return parseState(newState);
    }

    default:
      return state;
  }
};

// parse redux state
function parseState(state) {
  const currentData = appConfig.questions[state.currentQuestion];
  const hasMoreQuestions = !!appConfig.questions[state.currentQuestion + 1];

  let progress = currentData.progress;

  const currentQuestionData = {
    ...currentData,
    options: currentData.options.map(([text, profile]) => {
      return {
        text,
        profile,
      };
    }),
  };

  const countByProfile = {
    BBA: 0,
    ABA: 0,
    KBA: 0,
  };

  const customMauticFields = {};

  Object.keys(state.results).forEach((qnum) => {
    // the answer can be a profile (BBA, KBA, ABA) or other field result for fields with customMauticField defined
    const answer = state.results[qnum];

    // checking between a profile or custom mautic answer
    const customField = appConfig.questions[qnum].customMauticField;

    if (customField) {
      return (customMauticFields[customField] = answer);
    } else {
      countByProfile[answer] = (countByProfile[answer] || 0) + 1;
    }
  });

  let superior = { count: countByProfile['ABA'], profile: 'ABA' };

  Object.keys(countByProfile).forEach((p) => {
    const count = countByProfile[p];
    if (superior.count < count) {
      superior.count = count;
      superior.profile = p;
    }
  });

  let winnerProfile = superior.profile;

  // resolving ties
  // BBA 3 KBA 3: BBA wins.
  // BBA 3 ABA 3: ABA wins
  // KBA 3 ABA 3: ABA wins
  if (3 === countByProfile.BBA && countByProfile.BBA === countByProfile.KBA) {
    winnerProfile = 'BBA';
  }
  if (3 === countByProfile.BBA && countByProfile.BBA === countByProfile.ABA) {
    winnerProfile = 'ABA';
  }
  if (3 === countByProfile.KBA && countByProfile.KBA === countByProfile.ABA) {
    winnerProfile = 'ABA';
  }

  const redirectionUrl = appConfig.urlByProfile[winnerProfile];

  return {
    ...state,
    progress,
    countByProfile,
    redirectionUrl,
    winnerProfile,
    currentQuestionData,
    hasMoreQuestions,
    customMauticFields
  };
}

export function setReduxState(path, value) {
  return {
    type: UPDATE,
    path,
    value,
  };
}
