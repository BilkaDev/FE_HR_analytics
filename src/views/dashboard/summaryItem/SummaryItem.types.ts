import { ReactNode } from 'react';

export type IconVariant = 'blue' | 'green' | 'yellow';

export type SummaryItemProps = {
  name: string;
  value: ReactNode;
  icon: ReactNode;
  iconVariant: IconVariant;
};
