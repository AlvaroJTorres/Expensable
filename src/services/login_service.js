import { BASE_URL } from "../app/config";

export async function loginSession(loginData) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  return await res.json();
}

export async function logoutSession(token) {
  return await fetch(`${BASE_URL}/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Token token=${token}`,
    },
  });
}
