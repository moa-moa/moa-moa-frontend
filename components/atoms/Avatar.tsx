import Image from 'next/image';

interface Props {
  name: string;
  isAvailable: boolean;
  image?: string;
  size?: number;
}

export default function Avatar({ name, size, image, isAvailable }: Props) {
  const backgroundColor = nameToHslColor(name, 80, 40);
  const overlay = isAvailable ? '' : <Overlay />;
  const style = {
    backgroundColor,
    width: (size || 21) + 'px',
    height: (size || 21) + 'px'
  };
  const text = name[0];

  return (
    <div
      className='rounded-full flex justify-center items-center text-sm text-white fony-bold overflow-hidden border border-light-gray relative'
      style={style}>
      {image ? (
        <Image
          src={image}
          alt='avatar'
          width={size || 21}
          height={size || 21}
        />
      ) : (
        text
      )}
      {overlay}
    </div>
  );
}

function Overlay() {
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
  );
}

function nameToHslColor(str: string, s: number, l: number) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}
