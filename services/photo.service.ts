import axios, { AxiosRequestConfig } from 'axios';
import AuthService from './auth.service';

class PhotoService {
  constructor() {
    // To do
  }

  async uploadClubPhoto(files: FileList) {
    try {
      if (!AuthService.accessToken) {
        throw {
          status: 401,
          message: 'no signed in'
        };
      }
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('files', file);
      }

      const config: AxiosRequestConfig = {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: `Bearer ${AuthService.accessToken}`
        }
      };

      return await axios.post('/moamoa/image/club', formData, config);
    } catch (e: unknown) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        throw {
          status: e.response?.status,
          message: e.message
        };
      }

      if (e instanceof Error) {
        throw {
          status: 400,
          message: e.message
        };
      }

      throw {
        status: 400,
        message: 'Something went wrong'
      };
    }
  }
}

export default new PhotoService();
