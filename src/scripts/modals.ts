import { lockScroll, unlockScroll } from "./utils";

const modalOverlay = document.querySelector<HTMLElement>(
  "[data-modal-overlay]"
);

const _modalAnimationDuration = 600;

let _activeModalTrigger: HTMLElement | null = null;

function removeModal(modal: HTMLElement) {
  setTimeout(() => modal.remove(), _modalAnimationDuration);
}

export function closeModal(key: string) {
  const modal = document.querySelector<HTMLElement>(`[data-modal-root=${key}]`);

  if (!modal) return;

  modal.ariaHidden = "true";
  if (modalOverlay) modalOverlay.ariaHidden = "true";

  unlockScroll(_modalAnimationDuration);
  removeModal(modal);

  if (_activeModalTrigger) {
    _activeModalTrigger.focus();
    _activeModalTrigger.removeAttribute("aria-current");
    _activeModalTrigger = null;
  }
}

export function openModal(key: string, trigger: HTMLElement | null = null) {
  if (_activeModalTrigger) {
    const triggerKey = _activeModalTrigger.getAttribute("data-modal-trigger");

    if (triggerKey === key) {
      closeModal(key);

      return;
    }
  }

  const openedModals = document.querySelectorAll<HTMLElement>(
    "[data-modal-root]:not([aria-hidden=true])"
  );

  if (openedModals.length) {
    openedModals.forEach((modal) => {
      modal.ariaHidden = "true";
      removeModal(modal);
    });
  } else {
    _activeModalTrigger = trigger;
    if (trigger) trigger.ariaCurrent = "true";
    lockScroll();
  }

  const template = document.getElementById(key) as HTMLTemplateElement | null;

  if (!template) return;

  const templateContent = template.content.cloneNode(true) as HTMLElement;

  const root = templateContent.querySelector<HTMLElement>("[data-modal-root]");

  if (!root) return;

  const autofocus = templateContent.querySelector<HTMLElement>(
    "[autofocus]:not([disabled])"
  );
  const focusGuard =
    templateContent.querySelector<HTMLElement>("[data-focus-guard]");
  const focusable = templateContent.querySelector<HTMLElement>(
    'a, button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled])'
  );

  root.style.animationDuration = _modalAnimationDuration + "ms";

  root.addEventListener("pointerdown", (event) => {
    if (!(event.target as HTMLElement).closest("[data-modal-wrapper]"))
      closeModal(key);
  });

  document.addEventListener("click", (event) => {
    const closeTrigger = (event.target as HTMLElement).closest(
      "[data-modal-close]"
    );
    if (closeTrigger) {
      const closeTriggerKey = closeTrigger.getAttribute("data-modal-close");
      closeModal(
        closeTriggerKey && closeTriggerKey !== "" ? closeTriggerKey : key
      );
    }
  });

  if (modalOverlay) modalOverlay.ariaHidden = "false";

  document.body.appendChild(templateContent);

  (autofocus ?? focusable)?.focus({ preventScroll: true });

  if (focusGuard)
    focusGuard.addEventListener("focus", () => {
      focusable?.focus();
    });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") closeModal(key);
  });
}
