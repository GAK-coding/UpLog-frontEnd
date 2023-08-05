import { MemoryRouter, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}
export function withRouter(routes: JSX.Element, initialEntry: string = '/'): JSX.Element {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

export function withAllContexts(children: JSX.Element) {
  const testClient = createTestQueryClient();
  return <QueryClientProvider client={testClient}>{children}</QueryClientProvider>;
}
