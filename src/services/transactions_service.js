import { API_URL } from "../app/config";

export async function newTransaction(id, token, transactionData) {
  const res = await fetch(`${API_URL}/categories/${id}/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Token token=${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionData),
  });
  return await res.json();
}
