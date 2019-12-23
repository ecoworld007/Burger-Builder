import reducer from './auth';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      userId: '',
      token: '',
      authRedirectPath: '/'
    });
  });

  it('should store token on login', () => {
    expect(reducer({
      loading: false,
      error: null,
      userId: '',
      token: '',
      authRedirectPath: '/'
    }, {type: 'AUTH_SUCCESS',
      userId: 'some user id',
      token: 'some token'
    })).toEqual({
      loading: false,
      error: null,
      userId: 'some user id',
      token: 'some token',
      authRedirectPath: '/'
    });
  });
});