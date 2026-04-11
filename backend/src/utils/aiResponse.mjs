export const query = async (data) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.AI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: data
          }
        ]
      })
    }
  );

  const result = await response.json();
  if(!response.ok) console.log("Response: ", response);

  return {
    success: response.ok,
    status: response.status,
    data: result,
  };
}