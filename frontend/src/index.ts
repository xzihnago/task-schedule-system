import "./p-login";
import "./p-task";
import "./p-keys";
import "./p-venue";
import "./p-activity-center";
import "./p-entrance";

document.addEventListener("hide.bs.modal", () => {
  if (document.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }
});
