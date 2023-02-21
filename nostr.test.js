const { createMessage, postMessage } = require('./nostr');
require('dotenv').config();

test('test createMessage', async () => {
  const privatekey = process.env.NOSTR_PRIVATE_KEY;
  const content = 'test';
  const message = await createMessage(privatekey, content);
  const [ type, event ] = JSON.parse(message);
  expect(type).toBe('EVENT');
  expect(event).toHaveProperty('id');
  expect(event).toHaveProperty('pubkey');
  expect(event).toHaveProperty('created_at');
  expect(event).toHaveProperty('kind');
  expect(event).toHaveProperty('tags');
  expect(event).toHaveProperty('content');
  expect(event).toHaveProperty('sig');
  expect(event.content).toBe(content);
});

test('test', async () => {
  const relay = process.env.NOSTR_RELAY;
  const privatekey = process.env.NOSTR_PRIVATE_KEY;
  const content = 'test';
  const message = await createMessage(privatekey, content);
  await postMessage(relay, message);
});
