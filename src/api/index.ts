export function setDataToLS(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLS(key: string) {
  const data: string | null = localStorage.getItem(key);

  return data && data !== "undefined" ? JSON.parse(data) : null;
}

// GET

// POST

// PUT