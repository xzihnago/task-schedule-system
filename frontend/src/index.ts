import "./p-login";
import "./p-task";
import "./p-keys";
import "./p-venue";

document.addEventListener("hide.bs.modal", () => {
  if (document.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }
});
