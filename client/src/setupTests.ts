import '@testing-library/jest-dom';

import { server } from 'tests/msw/server';

beforeAll(() => server.listen());
afterAll(() => server.resetHandlers());
afterAll(() => server.close());
