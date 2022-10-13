import CustomError from '@/models/classes/customError';
import { IClub, IClubBody } from '@/models/interfaces/data/Club';
import { QueryFunctionContext } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
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

  async get() {
    try {
      const { data } = await axios.get<IClub[]>(
        '/moamoa/club?joinedUser=true&likedUser=true',
        {
          headers: { Authorization: `Bearer ${AuthService.accessToken}` }
        }
      );
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }
      throw new Error('Something went wrong');
    }
  }

  async getDetail(context: QueryFunctionContext<[string, number]>) {
    const {
      queryKey: [_, clubId]
    } = context;
    try {
      if (clubId <= 0) {
        const customError = new CustomError(404, 'not Found Club Data');
        throw customError;
      }

      const { data } = await axios.get<IClub>(`/moamoa/club/${clubId}`, {
        headers: { Authorization: `Bearer ${AuthService.accessToken}` }
      });

      return data;
    } catch (e: AxiosError | CustomError | unknown) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      if (e instanceof CustomError) {
        throw e.message;
      }

      throw new Error('Something went wrong');
    }
  }

  async like(clubId: number) {
    try {
      if (clubId <= 0) {
        const customError = new CustomError(404, 'not Found Club Data');
        throw customError;
      }

      const { data } = await axios.post<IClub>(
        `/moamoa/club/like/${clubId}`,
        null,
        {
          headers: { Authorization: `Bearer ${AuthService.accessToken}` }
        }
      );

      return data;
    } catch (e: AxiosError | CustomError | unknown) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      if (e instanceof CustomError) {
        throw e.message;
      }

      throw new Error('Something went wrong');
    }
  }

  async join(clubId: number) {
    try {
      if (clubId <= 0) {
        const customError = new CustomError(404, 'not Found Club Data');
        throw customError;
      }

      const { data } = await axios.post<IClub>(
        `/moamoa/club/join/${clubId}`,
        null,
        {
          headers: { Authorization: `Bearer ${AuthService.accessToken}` }
        }
      );

      return data;
    } catch (e: AxiosError | CustomError | unknown) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const responseData = e.response?.data as any;
        const message = responseData?.message || e.message;
        throw new Error(message);
      }

      if (e instanceof CustomError) {
        throw e.message;
      }

      throw new Error('Something went wrong');
    }
  }

  async leave(clubId: number) {
    try {
      if (clubId <= 0) {
        const customError = new CustomError(404, 'not Found Club Data');
        throw customError;
      }

      const { data } = await axios.delete<IClub>(
        `/moamoa/club/leave/${clubId}`,
        {
          headers: { Authorization: `Bearer ${AuthService.accessToken}` }
        }
      );

      return data;
    } catch (e: AxiosError | CustomError | unknown) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      if (e instanceof CustomError) {
        throw e.message;
      }

      throw new Error('Something went wrong');
    }
  }
}

export default new ClubService();
