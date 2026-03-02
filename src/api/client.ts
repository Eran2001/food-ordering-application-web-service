// Mock fetch wrapper with configurable latency and failure rate

interface MockFetchOptions {
  minDelay?: number;
  maxDelay?: number;
  failRate?: number;
}

export interface ApiError {
  message: string;
  code: string;
}

export async function mockFetch<T>(
  fn: () => T,
  opts: MockFetchOptions = {}
): Promise<T> {
  const { minDelay = 200, maxDelay = 800, failRate = 0.05 } = opts;
  const delay = Math.random() * (maxDelay - minDelay) + minDelay;

  await new Promise((resolve) => setTimeout(resolve, delay));

  if (Math.random() < failRate) {
    throw { message: "Something went wrong. Please try again.", code: "MOCK_ERROR" } as ApiError;
  }

  return fn();
}
