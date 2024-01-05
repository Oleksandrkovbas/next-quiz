const isemail = require('isemail');
const MauticConnector = require('node-mautic');
const mauticConfig = getMauticConfig();
const mauticConnector = new MauticConnector(mauticConfig);

const allowedMauticSegments = ['2'];

const allowedFields = [
  'learningtype',
  'challengefrustration',
  'why_do_you_want_to_learn',
];

module.exports.handler = async (event) => {
  let email = '';
  let segmentId = '';
  let result = {};

  try {
    const parsedBody = JSON.parse(event.body);
    segmentId = (parsedBody.segmentId || '').trim();
    result = parsedBody.result || {};
    email = (parsedBody.email || {}).trim();

    const entries = Object.entries(result);

    if (!entries.length) {
      throw new Error('empty result');
    }

    entries.forEach(([key]) => {
      if (!allowedFields.includes(key)) {
        throw new Error(`invalid field ${key}`);
      }
    });

    if (!isemail.validate(email)) {
      throw new Error(`invalid email "${email}"`);
    }

    if (!allowedMauticSegments.includes(segmentId)) {
      throw new Error(`invalid segmentId "${segmentId}"`);
    }
  } catch (e) {
    console.error(e);

    return {
      status: 500,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ message: e.message }),
    };
  }

  console.log({
    email,
    ...result,
  });

  const { contact } = await mauticConnector.contacts.createContact({
    email,
    ...result,
  });

  const addToSegment = await mauticConnector.segments.addContactToSegment(
    segmentId,
    contact.id
  );

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      ...addToSegment,
      contactId: contact.id,
    }),
  };
};

function getMauticConfig() {
  const variables = {
    apiUrl: (process.env.apiUrl || '').trim().replace(/\/$/, ''),
    username: (process.env.username || '').trim(),
    password: (process.env.password || '').trim(),
    timeoutInSeconds: 5,
  };

  console.log({ apiUrl: variables.apiUrl });

  const emptyVariables = [];

  Object.entries(variables).forEach(function ([key, value]) {
    if (value === undefined || value === '') {
      emptyVariables.push(key);
    }
  });

  if (emptyVariables.length) {
    throw new Error(
      `Required env variables are empty: ${emptyVariables.join(', ')}`
    );
  }

  return variables;
}
