function validateFormSubmit(event: SubmitEvent) {
  const controls = (
    event.currentTarget as HTMLFormElement
  ).querySelectorAll<HTMLDivElement>("[data-form-control]");

  let isValid = true;

  function validateRequired(
    target: HTMLInputElement,
    messageContainer: HTMLParagraphElement | null
  ) {
    if (target.value === "") {
      isValid = false;
      if (messageContainer) messageContainer.textContent = "Обязательное поле";
      target.ariaInvalid = "true";
    } else {
      if (messageContainer) messageContainer.textContent = "";
      target.ariaInvalid = "false";
    }
  }

  function validatePattern(
    target: HTMLInputElement,
    messageContainer: HTMLParagraphElement | null
  ) {
    if (!target.value && target.required) return;

    if (!new RegExp(`^(?:${target.pattern})$`).test(target.value)) {
      isValid = false;
      if (messageContainer)
        messageContainer.textContent = target.dataset.patternText ?? null;
      target.ariaInvalid = "true";
    } else {
      if (messageContainer) messageContainer.textContent = "";
      target.ariaInvalid = "false";
    }
  }

  if (controls.length)
    controls.forEach((control) => {
      const input = control.querySelector<HTMLInputElement>("input");
      const messageContainer = control.querySelector<HTMLParagraphElement>(
        "[data-form-control-message]"
      );

      if (input?.required) {
        validateRequired(input, messageContainer);
        input.addEventListener("input", () =>
          validateRequired(input, messageContainer)
        );
      }

      if (input?.pattern) {
        validatePattern(input, messageContainer);
        input.addEventListener("input", () =>
          validatePattern(input, messageContainer)
        );
      }
    });

  return isValid;
}

export function handleSubmitForm(event: SubmitEvent) {
  event.preventDefault();

  const target = event.target as HTMLFormElement;

  const isValid = validateFormSubmit(event);

  const responseEl = target.querySelector<HTMLParagraphElement>(
    "[data-form-response]"
  );

  if (!isValid) return;

  for (let i = 0; i < target.elements.length; i++) {
    (target.elements[i] as HTMLInputElement | HTMLButtonElement).disabled =
      true;
  }

  const formData = new FormData(target);

  if (responseEl) {
    responseEl.textContent = "";
    responseEl.classList.remove("invalid");
    responseEl.ariaHidden = "true";
  }

  setTimeout(() => {
    fetch(target.action, {
      method: target.method,
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          console.error(
            "response status",
            response.url,
            response.status,
            response.statusText
          );
          if (responseEl) {
            responseEl.classList.add("invalid");
            responseEl.textContent = "Что-то пошло не так!";
          }
          return;
        }

        if (responseEl) responseEl.textContent = "Заявка отправлена успешно!";
      })
      .catch((error) => {
        if (responseEl) {
          responseEl.classList.add("invalid");
          responseEl.textContent = error;
        }
        console.error(error);
      })
      .finally(() => {
        for (let i = 0; i < target.elements.length; i++) {
          target.elements[i].removeAttribute("disabled");
        }
        if (responseEl) responseEl.ariaHidden = "false";
      });
  }, 2000);
}
