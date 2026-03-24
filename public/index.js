function calculate() {
  const birthdateInput = document.getElementById('birthdate');
  const result = document.getElementById('result');

  if (!birthdateInput || !result) {
    return;
  }

  const dateValue = birthdateInput.value.trim();

  // Validate date format: YYYY/MM/DD
  const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (!dateFormatRegex.test(dateValue)) {
    result.innerText = 'Error: Please enter date in YYYY/MM/DD format';
    result.style.color = '#e74c3c';
    //result.style.color = '#b42318'; TODO: Showcase accessibility test failure for color contrast.
    return;
  }

  result.style.color = '#e74c3c';
  //result.style.color = '#333'; TODO: Showcase accessibility test failure for result contrast.
  fetch(`/calculate?birthdate=${dateValue}`)
    .then((res) => res.json())
    .then((data) => {
      result.innerText = data.message;
    })
    .catch(() => {
      result.innerText = 'Error occurred';
    });
}

function clearResult() {
  const birthdateInput = document.getElementById('birthdate');
  const result = document.getElementById('result');

  if (!birthdateInput || !result) {
    return;
  }

  birthdateInput.value = '';
  result.innerText = '';
  result.style.color = '#333';
}

window.calculate = calculate;
window.clearResult = clearResult;
