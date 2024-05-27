const KEY = process.env.FREEJOURNEY;
const url = "https://api.freejourney.xyz";

export default async function gpt4(prompt: any) {
  let body = { prompt: prompt };

  const response = await fetch(url + "/chat/chatgpt-4", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      "X-Freejourney-Key": KEY,
    },
  });

  const data = await response.json();

  return data;
}