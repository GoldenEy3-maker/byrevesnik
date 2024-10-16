import IMask from "imask";

export function initTelMask() {
  const tels = document.querySelectorAll<HTMLInputElement>("input[type=tel]");

  if (tels.length)
    tels.forEach((input) => {
      IMask(input, {
        mask: "+{7} (000) 000-00-00",
      });

      input.addEventListener("input", (event) => {
        input.value = (event.target as HTMLInputElement).value.replace(
          "+7 (8",
          "+7 ("
        );
      });
    });
}
