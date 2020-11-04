const { getUsername } = require('../src/libs/argumentGetter');

describe('get argument', function () {
  it('success', function () {
    process.argv.push('test');
    const username = getUsername();

    expect(username).not.toBeUndefined();
    process.argv = process.argv.slice(0, 2);
  });
  it('failure', function () {
    const username = getUsername();

    expect(username).toBeUndefined();
  });
});
