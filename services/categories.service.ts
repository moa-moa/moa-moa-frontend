import axios from 'axios';
import AuthService from './auth.service';
import { ICategory } from '@/models/interfaces/data/Category';

class CategoriesService {
  async getCategories() {
    try {
      const { data } = await axios.get<ICategory[]>('/moamoa/category', {
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

export default new CategoriesService();
