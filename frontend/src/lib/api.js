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
    const response = await fetch(url, { ...rest, signal: controller.signal });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Request failed with status ${response.status}`);
    }
    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

// Authentication API functions
export async function loginUser(credentials, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/auth/login`;
  const data = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    signal,
    timeout
  });
  return data;
}

export async function registerUser(userData, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/auth/register`;
  const data = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
    signal,
    timeout
  });
  return data;
}

export async function getCurrentUser(token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/auth/me`;
  const data = await fetchWithTimeout(url, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
    signal,
    timeout
  });
  return data;
}

async function fetchWithAuth(url, token, options = {}) {
  const { timeout = DEFAULT_TIMEOUT_MS, signal, ...rest } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true });
  }
  try {
    const response = await fetch(url, {
      ...rest,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...rest.headers,
      },
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

export async function fetchBookings({ limit = 10, signal, timeout, token } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/bookings?limit=${encodeURIComponent(limit)}`;
  if (token) {
    const data = await fetchWithAuth(url, token, { signal, timeout });
    return data;
  } else {
    const data = await fetchWithTimeout(url, { signal, timeout });
    return data;
  }
}

// Services API functions
export async function getServices({ signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/services`;
  const data = await fetchWithTimeout(url, { signal, timeout });
  return data;
}

export async function getServiceById(id, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/services/${id}`;
  const data = await fetchWithTimeout(url, { signal, timeout });
  return data;
}

export async function createService(serviceData, token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/services`;
  const data = await fetchWithAuth(url, token, { method: 'POST', body: JSON.stringify(serviceData), signal, timeout });
  return data;
}

// Appointments API functions
export async function getAppointments(token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/appointments`;
  const data = await fetchWithAuth(url, token, { signal, timeout });
  return data;
}

export async function createAppointment(appointmentData, token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/appointments`;
  const data = await fetchWithAuth(url, token, { method: 'POST', body: JSON.stringify(appointmentData), signal, timeout });
  return data;
}

// ERP Functions
export async function getProducts(token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/inventory/products`;
  const data = await fetchWithAuth(url, token, { signal, timeout });
  return data;
}

export async function createSalesOrder(orderData, token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/sales-orders`;
  const data = await fetchWithAuth(url, token, { method: 'POST', body: JSON.stringify(orderData), signal, timeout });
  return data;
}

export async function getSalesOrders(token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/sales-orders`;
  const data = await fetchWithAuth(url, token, { signal, timeout });
  return data;
}

export async function updateSalesOrder(id, orderData, token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/sales-orders/${id}`;
  const data = await fetchWithAuth(url, token, { method: 'PUT', body: JSON.stringify(orderData), signal, timeout });
  return data;
}

export async function getPurchaseOrders(token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/purchase-orders`;
  const data = await fetchWithAuth(url, token, { signal, timeout });
  return data;
}

export async function createPurchaseOrder(orderData, token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/purchase-orders`;
  const data = await fetchWithAuth(url, token, { method: 'POST', body: JSON.stringify(orderData), signal, timeout });
  return data;
}

export async function getInvoices(token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/invoices`;
  const data = await fetchWithAuth(url, token, { signal, timeout });
  return data;
}

export async function createInvoice(invoiceData, token, { signal, timeout } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/invoices`;
  const data = await fetchWithAuth(url, token, { method: 'POST', body: JSON.stringify(invoiceData), signal, timeout });
  return data;
}

export { getApiBaseUrl };
