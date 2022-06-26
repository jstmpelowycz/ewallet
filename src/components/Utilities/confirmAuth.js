exports.confirmAuth = (
  url,
  enteredEmail,
  enteredPassword,
  history,
  route,
  func
) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const errorMessage = data.error.message;
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      func(data);
      history.replace(`${route}`);
    })
    .catch((err) => {
      alert(err);
    });
};
