import { formatExpiration } from '@/settings/developers/utils.py/format-expiration';

jest.useFakeTimers().setSystemTime(new Date('2024-01-01T00:00:00.000Z'));

describe('formatExpiration', () => {
  it('should format properly when expiresAt is null', () => {
    const expiresAt = null;
    const result = formatExpiration(expiresAt);
    expect(result).toEqual('Never');
    const resultWithExpiresMention = formatExpiration(expiresAt, true);
    expect(resultWithExpiresMention).toEqual('Never expires');
  });
  it('should format properly when expiresAt is not null', () => {
    const expiresAt = '2024-01-10T00:00:00.000Z';
    const result = formatExpiration(expiresAt);
    expect(result).toEqual('In 9 days');
    const resultWithExpiresMention = formatExpiration(expiresAt, true);
    expect(resultWithExpiresMention).toEqual('Expires in 9 days');
  });
  it('should format properly when expiresAt is large', () => {
    const expiresAt = '2034-01-10T00:00:00.000Z';
    const result = formatExpiration(expiresAt);
    expect(result).toEqual('In 10 years');
    const resultWithExpiresMention = formatExpiration(expiresAt, true);
    expect(resultWithExpiresMention).toEqual('Expires in 10 years');
  });
});
