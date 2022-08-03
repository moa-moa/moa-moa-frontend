import type { NextPage } from 'next';

const Home: NextPage = () => {
  const hello = 'hello';

  if (hello === 'hello') { 
    return <div>HEllO</div>;
  }
  
  return <h1 className='text-3xl underline'>Hello world!</h1>;
};

export default Home;
