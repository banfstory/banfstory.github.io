function processInteraction(element, actionType) {
  const trackingName = element.getAttribute("data-tracking-name");
  const trackingType =
    element.getAttribute("data-tracking-type") || element.tagName.toLowerCase();

  const groupElement = element.closest("[data-tracking-group]");
  const trackingGroup = groupElement
    ? groupElement.getAttribute("data-tracking-group")?.trim()
    : null;

  const subGroupElement = element.closest("[data-tracking-subgroup]");
  const trackingSubGroup = subGroupElement
    ? subGroupElement.getAttribute("data-tracking-subgroup")?.trim()
    : null;

  let elementValue;
  const tagName = element.tagName.toLowerCase();

  if (tagName === "input") {
    const inputType = (element.type || "").toLowerCase();

    if (inputType === "checkbox") {
      elementValue = element.checked;
    } else if (inputType === "radio") {
      elementValue = element.value;
    } else if (inputType === "password") {
      elementValue = "[REDACTED]";
    } else if (inputType !== "submit" && inputType !== "button") {
      const canCaptureValue = element.getAttribute("data-capture-value") === "true";
      elementValue =
        canCaptureValue && element.value
          ? element.value
          : element.value
            ? "[HAS_VALUE]"
            : "[EMPTY]";
    }
  } else if (tagName === "select") {
    elementValue = element.options[element.selectedIndex]?.text;
  } else if (tagName === "textarea") {
    const canCaptureValue = element.getAttribute("data-capture-value") === "true";
    elementValue =
      canCaptureValue && element.value
        ? element.value
        : element.value
          ? "[HAS_VALUE]"
          : "[EMPTY]";
  }

  const elementUrl =
    element.getAttribute("data-tracking-url") || element.getAttribute("href");

  const elementData = {
    name: trackingName,
    type: trackingType,
  };

  // Only set subgroup if trackingGroup exists
  if (trackingGroup) {
    elementData.group = trackingGroup;

    if (trackingSubGroup) {
      elementData.subGroup = trackingSubGroup;
    }
  }

  if (elementValue !== null && elementValue !== undefined && elementValue !== "") {
    elementData.value = elementValue;
  }

  if (elementUrl) {
    elementData.url = elementUrl;
  }

  const dataLayerPayload = {
    event: actionType,
    element: elementData,
  };

  console.log("Adobe Analytics Payload:", dataLayerPayload);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(dataLayerPayload);
}

(function() {
  const handleClick = (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest("[data-tracking-name]");
    if (!target) return;

    const tagName = target.tagName.toLowerCase();
    const inputType = (target.type || "").toLowerCase();

    if (
      inputType === "radio" ||
      inputType === "checkbox" ||
      tagName === "select" ||
      tagName === "input" ||
      tagName === "textarea"
    ) {
      return;
    }

    processInteraction(target, "click");
  };

  const handleChange = (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest("[data-tracking-name]");
    if (!target) return;

    const tagName = target.tagName.toLowerCase();
    const inputType = (target.type || "").toLowerCase();

    if (inputType === "checkbox" || tagName === "select" || inputType === "radio") {
      processInteraction(target, "change");
    }
  };

  const handleBlur = (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest("[data-tracking-name]");
    if (!target) return;

    const tagName = target.tagName.toLowerCase();
    const inputType = (target.type || "").toLowerCase();

    if (
      tagName === "textarea" ||
      (tagName === "input" &&
        inputType !== "checkbox" &&
        inputType !== "radio" &&
        inputType !== "submit" &&
        inputType !== "button")
    ) {
      processInteraction(target, "blur");
    }
  };

  const listenerOptions = { capture: true };

  window.addEventListener("click", handleClick, listenerOptions);
  window.addEventListener("change", handleChange, listenerOptions);
  window.addEventListener("blur", handleBlur, listenerOptions);

  return function cleanup() {
    window.removeEventListener("click", handleClick, listenerOptions);
    window.removeEventListener("change", handleChange, listenerOptions);
    window.removeEventListener("blur", handleBlur, listenerOptions);
  };
})();