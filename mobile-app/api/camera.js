export const uploadImage = async imageData => {
  const response = await fetch("http://127.0.0.1:5000/camera/save", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ imageData })
  });

  if (response.ok) {
    console.log(response)
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
