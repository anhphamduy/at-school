export const getEmoji = async (sentence, token, callback = () => {}) => {
  const response = await fetch("http://127.0.0.1:5000/getemoji", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sentence, token })
  });
  if (response.ok) {
    callback();
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
