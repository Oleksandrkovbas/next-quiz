import appConfig from '../config';

export async function submitResult(email, state) {
  return fetch(appConfig.apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      email,
      segmentId: appConfig.segmentId,
      result: {
        [appConfig.resultField]: state.winnerProfile,
        ...state.customMauticFields,
      },
    }),
  });
}
