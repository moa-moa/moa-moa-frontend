import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Void({ children }: Props) {
  return <section>{children}</section>;
}
