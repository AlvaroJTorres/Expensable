import { API_URL } from "../app/config";

export async function getCategories(token) {
  const res = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers: {
      Authorization: `Token token=${token}`,
    },
  });
  return await res.json();
}

export async function newCategory(token, categoryData) {
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      Authorization: `Token token=${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });
  return await res.json();
}
