import { IToken } from '@/models/interfaces/data/Token';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface IAuthService {
  googleLogin: () => Promise<IToken>;
}

class AuthService implements IAuthService {
  private _accessToken: string | null = null;
  constructor() {
    // To do
  }

  setAccessToken(value: string) {
    this._accessToken = value;
  }

  async googleLogin(): Promise<IToken> {
    try {
      const { data } = await axios.get<IToken>('/moamoa/auth/auto-login');
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
