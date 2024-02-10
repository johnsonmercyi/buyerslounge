export const HTTPMethods = {
  POST: "post",
  GET: "get",
}

export const makeRequest = async (url, method, payload) => {
  const response = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return await response.json();
}