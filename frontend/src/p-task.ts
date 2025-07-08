import { getElement, apiHandler } from "utils";

document.getElementById("button-task-add")?.addEventListener("click", () => {
  getElement<HTMLInputElement>("input-id").value = "";
  getElement<HTMLInputElement>("input-date").value = "";
  getElement<HTMLInputElement>("input-title").value = "";
  getElement<HTMLTextAreaElement>("input-content").value = "";
  getElement<HTMLSelectElement>("input-responsible").innerHTML =
    "<option value=''></option>" +
    window.users
      .map((user) => `<option value="${user.id}">${user.nickname}</option>`)
      .join("");
  getElement<HTMLTextAreaElement>("input-internal-status").value = "";
  getElement<HTMLTextAreaElement>("input-external-status").value = "";
});

document.getElementById("button-task-delete")?.addEventListener("click", () => {
  const inputId = getElement<HTMLInputElement>("input-id");
  if (inputId.value === "") return;

  axios
    .delete(`/api/tasks/${inputId.value}`)
    .then(() => {
      window.location.reload();
    })
    .catch((err: unknown) =>
      setTimeout(() => {
        apiHandler.failed()(err as never);
      }, 200)
    );
});

document.getElementById("form-task")?.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const inputId = getElement<HTMLInputElement>("input-id");
  const inputDate = getElement<HTMLInputElement>("input-date");
  const inputTitle = getElement<HTMLInputElement>("input-title");
  const inputContent = getElement<HTMLTextAreaElement>("input-content");
  const inputResponsible = document.getElementById(
    "input-responsible"
  ) as HTMLSelectElement | null;
  const inputInternalStatus = getElement<HTMLTextAreaElement>(
    "input-internal-status"
  );
  const inputExternalStatus = getElement<HTMLTextAreaElement>(
    "input-external-status"
  );

  const data = {
    date: inputDate.value || null,
    title: inputTitle.value,
    content: inputContent.value,
    responsibleId: inputResponsible
      ? inputResponsible.value || null
      : undefined,
    internalStatus: inputInternalStatus.value,
    externalStatus: inputExternalStatus.value,
  };

  new bootstrap.Modal("#modal-task").hide();

  (inputId.value
    ? axios.put(`/api/tasks/${inputId.value}`, data)
    : axios.post(`/api/tasks/${year}`, data)
  )
    .then(() => {
      window.location.reload();
    })
    .catch((err: unknown) =>
      setTimeout(() => {
        apiHandler.failed()(err as never);
      }, 200)
    );
});

const initTaskTable = async () => {
  const tBody = document.getElementById("tbody-task");
  if (!tBody) return;

  await Promise.all([
    axios.get<APIResponseSuccess<typeof window.users>>(`/api/users`),
    axios.get<APIResponseSuccess<typeof window.tasks>>(`/api/tasks`, {
      params: {
        year,
      },
    }),
  ]).then(([users, tasks]) => {
    window.users = users.data.data;
    window.tasks = tasks.data.data.map((task) => {
      task.date = task.date
        ? new Date(task.date).toISOString().split("T")[0]
        : null;
      return task;
    });
  });

  // render tasks
  tBody.innerHTML = window.tasks
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      return dateA.getTime() - dateB.getTime();
    })
    .map(
      (task) => `
          <tr style="height: 55px">
            <td hidden>${task.id}</td>
            <td>${task.date ?? ""}</td>
            <td>${task.title}</td>
            <td>${task.content}</td>
            <td>${window.users.find((user) => user.id === task.responsibleId)?.nickname ?? ""}</td>
            <td>${task.internalStatus}</td>
            <td>${task.externalStatus}</td>
            <td style="width: 1px; white-space: nowrap">${
              task.editable
                ? `<button class="btn btn-warning button-task-edit" type="button" data-bs-toggle="modal" data-bs-target="#modal-task" name="${task.id}">編輯</button>`
                : ""
            }</td>
          </tr>
          `
    )
    .join("");

  // add event listeners to edit buttons
  document
    .querySelectorAll<HTMLButtonElement>(".button-task-edit")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const task = window.tasks.find((task) => task.id === button.name);
        if (!task) return; // Should not happen

        getElement<HTMLInputElement>("input-id").value = button.name;
        getElement<HTMLInputElement>("input-date").value = task.date ?? "";
        getElement<HTMLInputElement>("input-title").value = task.title;
        getElement<HTMLTextAreaElement>("input-content").value = task.content;

        const inputResponsible = document.getElementById("input-responsible");
        if (inputResponsible) {
          inputResponsible.innerHTML =
            "<option value=''></option>" +
            window.users
              .map(
                (user) => `
                    <option value="${user.id}" ${
                      user.id === task.responsibleId ? "selected" : ""
                    }>${user.nickname}</option>
                    `
              )
              .join("");
        }

        getElement<HTMLTextAreaElement>("input-internal-status").value =
          task.internalStatus;
        getElement<HTMLTextAreaElement>("input-external-status").value =
          task.externalStatus;
      });
    });
};

initTaskTable().catch(apiHandler.failed());

declare global {
  interface Window {
    users: { id: string; nickname: string }[];

    tasks: {
      id: string;
      editable: boolean;

      date: string | null;
      title: string;
      content: string;
      responsibleId: string | null;
      internalStatus: string;
      externalStatus: string;
    }[];
  }
}
