function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/users/login",
    data
  });
}

function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/users",
    data
  });
}

function getMyDetails() {
  console.log("getMyDetails");
  return $.ajax({
    url: "/users/me",
  });
}
