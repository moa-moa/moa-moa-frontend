import axios, { AxiosError, AxiosResponse } from 'axios';

interface IAuthService {
  googleLogin: () => Promise<AxiosResponse<any, any>>;
}

class AuthService implements IAuthService {
  private _accessToken: string | null = null;

  constructor() {
    // To do
  }

  setAccessToken(value: string) {
    this._accessToken = value;
  }

  async googleLogin() {
    try {
      const { data } = await axios.get<any>('/moamoa/auth/auto-login');
      return data;
    } catch (e: Error | AxiosError | unknown) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }
      throw new Error('Something went wrong');
    }
  }

  get accessToken() {
    return this._accessToken;
  }
}

export default new AuthService();
