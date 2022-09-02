import { IToken } from '@/models/interfaces/data/Token';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface IAuthService {
  googleLogin: () => Promise<IToken>;
}

class AuthService implements IAuthService {
  private _accessToken: string | null = null;
  private _updatedAtToken: number | null = null;
  private timer: NodeJS.Timeout | undefined = undefined;
  constructor() {
    // To do
  }

  setAccessToken(value: string) {
    this._accessToken = value;
    this._updatedAtToken = +new Date();
  }

  refreshLogin(callback: () => void) {
    const DELAY_TIME = 1000 * 60 * 119;
    clearTimeout(this.timer);
    this.timer = setTimeout(callback, DELAY_TIME);
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
