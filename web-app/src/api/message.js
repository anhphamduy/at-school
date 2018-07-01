export const getMessage = async (messageType, token, callback = () => {}) => {
  const response = await fetch("http://127.0.0.1:5000/getmessage", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messageType, token })
  });
  if (response.ok) {
    callback();
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
