const { getMentionList, getPostData } = require('../../index');

describe('getMentionList', () => {
  test('convert mention user', () => {
    const convertData = getMentionList('@GITHUB_USER_ID_1 aaa');
    expect(convertData).toStrictEqual(['<@SLACK_USER_ID_1>']);
  });

  test('convert mention users', () => {
    const convertData = getMentionList(
      '@GITHUB_USER_ID_1 aaa @GITHUB_USER_ID_2'
    );
    expect(convertData).toStrictEqual([
      '<@SLACK_USER_ID_1>',
      '<@SLACK_USER_ID_2>'
    ]);
  });

  test('return empty array when not in mapping.json', () => {
    const convertData = getMentionList('@GITHUB_USER_ID_5');
    expect(convertData).toStrictEqual([]);
  });

  test('return empty array when body is null or undefined', () => {
    expect(getMentionList(null)).toStrictEqual([]);
    expect(getMentionList(undefined)).toStrictEqual([]);
  });
});

describe('getPostData', () => {
  test('get data', () => {
    process.env.CHANNEL_ID = 'ABC123';
    process.env.API_TOKEN = 'DEF456';
    const message = { title: 'post data title' };
    expect(getPostData(message)).toStrictEqual({
      username: 'github2slack',
      channel: 'ABC123',
      text: message.title,
      token: 'DEF456'
    });
  });
});
