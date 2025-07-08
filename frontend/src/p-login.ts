import { getElement, apiHandler } from "utils";

document.getElementById("form-login")?.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const usernameInput = getElement<HTMLInputElement>("input-username");
  const passwordInput = getElement<HTMLInputElement>("input-password");

  axios
    .post("/api/users/login", {
      username: usernameInput.value,
      password: passwordInput.value,
    })
    .then(() => {
      const year = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Taipei",
        year: "numeric",
      });

      window.location.replace(`/${year}/task`);
    })
    .catch(apiHandler.failed({ 401: "無效的使用者名稱或密碼" }));
});

document.getElementById("button-logout")?.addEventListener("click", () => {
  void axios
    .get("/api/users/logout")
    .catch()
    .finally(() => {
      window.location.replace("/");
    });
});
