import axios from 'axios';
import AuthService from './auth.service';
import { ICategory } from '@/models/interfaces/data/Category';
import { IClub } from '@/models/interfaces/data/Club';

class CategoriesService {
  async getCategories() {
    try {
      const { data } = await axios.get<ICategory[]>(
        '/moamoa/category?club=true',
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

  convertWithAllandEnd(categories: ICategory[]) {
    const allClubs: IClub[] = categories.reduce((result: IClub[], cate) => {
      return [...result, ...cate.Club];
    }, []);

    const allCategory: ICategory = {
      id: -1,
      name: '전체',
      backColor: '#333333',
      Club: allClubs
    };
    const endCategory: ICategory = {
      id: -2,
      name: '종료',
      backColor: '#777777',
      Club: []
    };

    return [allCategory, ...categories, endCategory];
  }
}

export default new CategoriesService();
