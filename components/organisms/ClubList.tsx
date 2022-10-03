export default function ClubList() {
  return (
    // <ul>
    //   <li>클럽 리스트</li>
    // </ul>
    <>
      <Skeleton />
    </>
  );
}

function Skeleton() {
  const list = Array.from({ length: 10 }, (_, i) => `skeleton-${i + 1}`);
  return (
    <ul className='flex flex-col gap-[0.625rem]'>
      {list.map((id) => (
        <li key={id} className='skeleton h-[5.5rem] rounded-[0.3125rem]'></li>
      ))}
    </ul>
  );
}
