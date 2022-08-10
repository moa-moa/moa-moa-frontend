import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function RenewClub({ children }: Props) {
  return (
    <section className='min-h-screen flex flex-col'>
      <header>Header</header>
      <main className='flex-1 mt-[0.1rem] max-w-5xl w-full mx-auto'>
        {children}
      </main>
      <footer>footer</footer>
    </section>
  );
}
