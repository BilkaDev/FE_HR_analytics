import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import { AppProviders } from 'appProviders/AppProviders';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Router>
      <AppProviders>{children}</AppProviders>
    </Router>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
