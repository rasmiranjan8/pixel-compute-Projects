const slider = document.getElementById("charRange");
const charCount = document.getElementById("char-count");

slider.addEventListener("input", () => {
  charCount.textContent = slider.value;
});

const copyBtn = document.querySelector(".copy-btn");
copyBtn.addEventListener("click", () => {
  const passwordInput = document.querySelector(".password-display input");
  passwordInput.select();
  document.execCommand("copy");
});

const includeNumbers = document.querySelector("#numbers").checked;
const includeLetters = document.querySelector("#letters").checked;
const includeMixedCase = document.querySelector("#mixed-case").checked;
const includePunctuation = document.querySelector("#punctuation").checked;
const generatePassword = () => {
  const passwordLength = slider.value;

  let characters = "";

  if (includeNumbers) {
    characters += "0123456789";
  }

  if (includeLetters) {
    characters += "abcdefghijklmnopqrstuvwxyz";
  }

  if (includeMixedCase) {
    characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (includePunctuation) {
    characters += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  }

  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  const passwordInput = document.querySelector(".password-display input");
  passwordInput.value = password;
};

slider.addEventListener("change", generatePassword);
includeNumbers.addEventListener("change", generatePassword);
includeLetters.addEventListener("change", generatePassword);
includeMixedCase.addEventListener("change", generatePassword);
includePunctuation.addEventListener("change", generatePassword);