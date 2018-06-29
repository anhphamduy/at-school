export const uploadImage = async (imageData, callback = () => {}) => {
  const response = await fetch("http://127.0.0.1:5000/camera/upload", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ imageData })
  });
  const data = await response.json();
  if (data.success) {
    callback();
    console.log(data)
    return data;
  }

  const errMessage = await data.message;
  throw new Error(errMessage);
};
