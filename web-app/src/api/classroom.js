export const createClass = async (classInfo, token, callback = () => {}) => {
  const response = await fetch("http://127.0.0.1:5000/classroom/createclass", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...classInfo, token })
  });
  if (response.ok) {
    callback();
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

export const getClassTeacher = async (token, callback = () => {}) => {
  const response = await fetch(
    "http://127.0.0.1:5000/classroom/teacher/getclass",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token })
    }
  );
  if (response.ok) {
    callback();
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

export const teacherHasClass = async (token, callback = () => {}) => {
  const response = await fetch(
    "http://127.0.0.1:5000/classroom/teacher/hasclass",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token })
    }
  );
  if (response.ok) {
    callback();
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
