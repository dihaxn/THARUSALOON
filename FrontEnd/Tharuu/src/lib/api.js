const DEFAULT_TIMEOUT_MS = 10000;

function getApiBaseUrl() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  return baseUrl.replace(/\/$/, '');
}

async function fetchWithTimeout(url, options = {}) {
  const { timeout = DEFAULT_TIMEOUT_MS, signal, ...rest } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true });
  }

  try {
    const response = await fetch(url, {
      ...rest,
      signal: controller.signal
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Request failed with status ${response.status}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchBookings({ limit = 10, signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/bookings?limit=${encodeURIComponent(limit)}`;
  const data = await fetchWithTimeout(url, { signal, timeout });
  return data;
}

export { getApiBaseUrl };
