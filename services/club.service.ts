import { IClub, IClubBody } from '@/models/interfaces/data/Club';
import axios from 'axios';
import AuthService from './auth.service';

class ClubService {
  async create(body: IClubBody) {
    try {
      const { data } = await axios.post<IClub>('/moamoa/club', body, {
        headers: { Authorization: `Bearer ${AuthService.accessToken}` }
      });
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }
      throw new Error('Something went wrong');
    }
  }
}

export default new ClubService();
