let selectedFrom = "";
let selectedTo = "";

async function populateCurrencyDropdowns() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  const fromOptions = document.getElementById("fromOptions");
  const toOptions = document.getElementById("toOptions");

  const added = new Set();
  const currencyList = [];

  data.forEach((country) => {
    const currencies = country.currencies;
    const flag = country.flags?.png;

    if (currencies && flag) {
      const [currencyCode, currencyData] = Object.entries(currencies)[0];
      if (!added.has(currencyCode)) {
        added.add(currencyCode);
        currencyList.push({
          code: currencyCode,
          name: currencyData.name,
          flag: flag,
        });
      }
    }
  });

  currencyList.sort((a, b) => a.code.localeCompare(b.code));

  currencyList.forEach(({ code, name, flag }) => {
    const label = `${code} - ${name}`;
    const html = `<img src="${flag}" alt="${code}" /> <span>${label}</span>`;

    const liFrom = document.createElement("li");
    liFrom.innerHTML = html;
    liFrom.dataset.value = code;

    const liTo = liFrom.cloneNode(true);
    liTo.dataset.value = code;

    fromOptions.appendChild(liFrom);
    toOptions.appendChild(liTo);
  });

  setupDropdown("fromDropdown", (value) => (selectedFrom = value));
  setupDropdown("toDropdown", (value) => (selectedTo = value));
}

function setupDropdown(id, callback) {
  const dropdown = document.getElementById(id);
  const selected = dropdown.querySelector(".selected");
  const optionsList = dropdown.querySelector(".options");

  dropdown.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerHTML = option.innerHTML;
      dropdown.classList.remove("active");
      callback(option.dataset.value);
    });
  });

  selected.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");
  });

  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  resultDiv.style.display = "none";
  errorDiv.style.display = "none";

  if (!amount || !selectedFrom || !selectedTo) {
    errorDiv.textContent = "Please fill all fields correctly.";
    errorDiv.style.display = "block";
    return;
  }

  const apiKey = "494a6b051ac4dbbb5f5eace9";
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${selectedFrom}/${selectedTo}/${amount}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.result === "success") {
      resultDiv.textContent = `${amount} ${selectedFrom} = ${data.conversion_result} ${selectedTo}`;
      resultDiv.style.display = "block";
    } else {
      errorDiv.textContent = "Conversion failed. Please try again.";
      errorDiv.style.display = "block";
    }
  } catch (err) {
    errorDiv.textContent = "Invalid Inputs, please try again";
    errorDiv.style.display = "block";
  }
}

populateCurrencyDropdowns();
document
  .getElementById("convertBtn")
  .addEventListener("click", convertCurrency);
