import { showUserPopup } from '../components/UserPopup';
import { FIELD_SELECTORS } from '../utils/constants';


// This is to add a listener for messages coming from background
chrome.runtime.onMessage.addListener((message, sender, response) => {
  console.log("inmessage response", message, sender, response);

  if (message.type === "CHECK_FOR_EMAIL_FIELD") {
    const emailRegex = /\S+@\S+\.\S+/;

    // Expected email fields
    const observer = new MutationObserver(() => {
      const emailField = document.querySelector(
        'input[type="email"], input[name*="email" i], input[id*="email" i], input[placeholder*="email" i], input[aria-label*="email" i]'
      );

    console.log("emailField", emailField);

    if (!emailField) return;
    console.log("emailField.__autofillListenerAttached", emailField.__autofillListenerAttached);
    
    if (emailField.__autofillListenerAttached) return;
    emailField.__autofillListenerAttached = true;
    //listening to value from the input field of email
    emailField.addEventListener("input", () => {
      const value = emailField.value;
      if (emailRegex.test(value)) {
        chrome.runtime.sendMessage(
          {
            type: "CHECK_FOR_EMAIL_FIELD",
            email: value,
            tabURL: window.location.href
          },
          (response) => {
            //when response has data matching with userData in db, showing the popup to prefill
            if (response && response?.match && response?.user) {
              showUserPopup(
                response.user,
                () => prefillFormFields(response.user),
                removeUserPopup
              );
            } else {
            //Removing popup if showing
              removeUserPopup();
            }
          }
        );
      } else {
        //Removing popup if showing
        removeUserPopup();
      }
    });
    observer.disconnect();
    })
    observer.observe(document.body, { childList: true, subtree: true });
  }
});


const prefillFormFields = (user) => {
    // Form matching google fields
  if (user && document.querySelector(".whsOnd")) {
    prefillGoogleForms(user);
  } 
  else {
    // Generic form with input type key or id
    prefillGenericForms(user);
  }
};

// google form or related code to pick elements
const prefillGoogleForms = (user) => {
  console.log("userdata google");
  const fieldMap = {
    name: ["name", "full name", "your name"],
    firstName: ["first name"],
    lastName: ["last name"],
    age: ["age", "years"],
    mobile: ["phone", "mobile", "contact"],
    gender: ["gender", "sex"]
  };
  const fields = document.querySelectorAll('input.whsOnd, textarea.KHxj8b');
  fields.forEach((field) => {
    let label=""
    const container = field.closest(".Qr7Oae");

    if (container) {
      const labelElement = container.querySelector(".M7eMe");
      if (labelElement && labelElement.innerText) {
        label = labelElement.innerText.trim();
      }
    }
    // added this fallback logic if the google form is not found
    if (!label && field.hasAttribute("aria-labelledby")) {
      const idList = field.getAttribute("aria-labelledby").split(" ");
      let labelParts = [];
  
      for (let i = 0; i < idList.length; i++) {
        const id = idList[i];
        const el = document.getElementById(id);
        if (el && el.innerText) {
          labelParts.push(el.innerText.trim());
        }
      }
      label = labelParts.join(" ").trim();
    }
    if (!label) return;
    label = label.toLowerCase();
    for (let key in fieldMap) {
      const fieldNames= fieldMap[key]
      if (fieldNames.some((name) => label.includes(name))) {
        let value
        if (key === "name") {
          value = user.firstName + " " + user.lastName;
        } else {
          value = user[key];
        }
  
        if (value) {
          setFieldValue(field, value);
        }
        break
    }
  }
  });
};

// generic form element data
const prefillGenericForms = (user) => {
  console.log("userdata");
    // Stored input field data
  Object.entries(FIELD_SELECTORS).forEach(([key, selectors]) => {
    let value =
      key === "fullName" || key === "name"
        ? `${user.firstName} ${user.lastName}`
        : user[key];

    if (!value) return;

    selectors.forEach((sel) => {
      const field = document.querySelector(sel);
      if (field) {
        console.log(`Prefilling ${key}:`, field, "→", value);
        setFieldValue(field, value);
      }
    });
  });
};


const setFieldValue = (field, value) => {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    field.tagName === "TEXTAREA"
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype,
    "value"
  ).set;
  nativeSetter.call(field, ""); 
  nativeSetter.call(field, value);
  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
  field.dispatchEvent(new Event("blur", { bubbles: true }));
};
// Removing the popup
const removeUserPopup = () => {
  const popup = document.getElementById("email-detector-popup");
  if (popup) popup.remove();
};
