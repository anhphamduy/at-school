export const login = async (username, password, callback = () => {}) => {
  const response = await fetch("http://127.0.0.1:5000/auth/signin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (response.ok) {
    callback();
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

export const logout = async (token, callback = () => {}) => {
  const response = await fetch("http://127.0.0.1:5000/auth/signout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token })
  });

  if (response.ok) {
    const data = await response.json();
    callback();
    return data.success;
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

export const checkDuplicateUser = async username => {
  const response = await fetch("http://127.0.0.1:5000/auth/duplicateuser", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username })
  });

  if (response.ok) {
    const data = await response.json();
    return data.duplicate;
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

export const register = async (data, callback) => {
  const response = await fetch("http://127.0.0.1:5000/auth/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    callback();
    return;
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
