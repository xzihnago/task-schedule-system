import { getElement, apiHandler } from "utils";

document
  .getElementById("form-upload-keys")
  ?.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const inputFile = getElement<HTMLInputElement>("input-file");

    const formData = new FormData();
    formData.append("file", inputFile.files?.[0] ?? new Blob());

    axios
      .post("/api/keys", formData)
      .then(() => {
        window.location.reload();
      })
      .catch(apiHandler.failed({ 413: "檔案過大，請上傳小於 10MB 的檔案" }));
  });
