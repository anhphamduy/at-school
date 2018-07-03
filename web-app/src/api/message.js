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

export const getMessageDetails = async (token, id, callback = () => {}) => {
  const response = await fetch("http://127.0.0.1:5000/getmessage/details", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token, id })
  });
  if (response.ok) {
    callback();
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
}

export const sendMessage = async (token, id, content, callback = () => {}) => {
  const response = await fetch("http://127.0.0.1:5000/sendmessage", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token, id, content })
  });
  if (response.ok) {
    callback();
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
}
