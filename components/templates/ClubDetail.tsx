import { ILayoutProps } from '@/models/interfaces/props/layout';
import Molecules from '../molecules';

export default function ClubDetail({ children }: ILayoutProps) {
  return (
    <section className='min-h-screen flex flex-col'>
      <Molecules.DetailHeader />
      <main className='flex-1 mt-[0.1rem] max-w-5xl w-full mx-auto'>
        {children}
      </main>
      <Molecules.DetailFooter />
    </section>
  );
}
