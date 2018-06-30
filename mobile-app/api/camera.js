export const uploadImage = async (imageData, token, callback = () => {}) => {
  console.log(token)
  const response = await fetch("http://192.168.1.13:5000/camera/save", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ imageData, token })
  });

  if (response.ok) {
    callback();
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
