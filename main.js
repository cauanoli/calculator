function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function operation(a, b, operation) {
  let result = 0;
  switch (operation) {
    case "multiplication":
      result = multiplication(a, b);
      break;
    case "division":
      result = division(a, b);
      break;
    case "addition":
      result = add(a, b);
      break;
    case "subtraction":
      result = subtract(a, b);
      break;
  }

  return result;
}

function getOperationSymbol(operation) {
  if (operation === "multiplication") {
    return "x";
  }

  if (operation === "division") {
    return "/";
  }

  if (operation === "addition") {
    return "+";
  }

  if (operation === "subtraction") {
    return "-";
  }
}

function updateDisplay(firstNumber, secondNumber, operation) {
  const previousDiv = document.querySelector(".previous");
  const currentDiv = document.querySelector(".current-number");
  const operationDiv = document.querySelector(".operation");

  if (firstNumber && secondNumber && operation) {
    currentDiv.textContent = secondNumber;
    previousDiv.textContent = firstNumber;
  } else {
    currentDiv.textContent = firstNumber;
    previousDiv.textContent = secondNumber;
  }

  operationDiv.textContent = getOperationSymbol(operation);
}

(function () {
  let firstNumber = null;
  let secondNumber = null;
  let currentOperation = null;
  const operationButtons = document.querySelectorAll(".operator");
  const numbers = document.querySelectorAll(".number");

  const clearButton = document.querySelector("#clear");
  const equalsButton = document.querySelector("#equals");
  const backspaceButton = document.querySelector("#backspace");

  function resetCalculator() {
    firstNumber = null;
    secondNumber = null;
    currentOperation = null;
    result = null;
  }

  function showResult() {
    firstNumber = operation(
      Number(firstNumber),
      Number(secondNumber),
      currentOperation
    );
    secondNumber = null;
    currentOperation = null;
    updateDisplay(firstNumber, secondNumber, currentOperation);
  }

  clearButton.addEventListener("click", () => {
    resetCalculator();
    updateDisplay(firstNumber, secondNumber, currentOperation);
  });

  backspaceButton.addEventListener("click", (event) => {
    if (firstNumber && !secondNumber) {
      firstNumber = firstNumber.slice(0, firstNumber.length - 1);
      updateDisplay(firstNumber, secondNumber, currentOperation);
    }

    if (firstNumber && secondNumber) {
      secondNumber = secondNumber.slice(0, secondNumber.length - 1);
      // show the
      updateDisplay(firstNumber, secondNumber, currentOperation);
    }
  });

  equalsButton.addEventListener("click", () => {
    if (firstNumber && currentOperation && secondNumber) {
      showResult();
    }
  });

  numbers.forEach((number) => {
    let value = number.textContent;
    number.addEventListener("click", () => {
      if (firstNumber === null) {
        if (value != 0) {
          firstNumber = value;
          updateDisplay(firstNumber, secondNumber, currentOperation);
          return;
        }
      }

      if (
        firstNumber !== null &&
        currentOperation === null &&
        secondNumber === null
      ) {
        firstNumber += value;
        updateDisplay(firstNumber, secondNumber, currentOperation);
        return;
      }

      if (firstNumber && currentOperation && secondNumber === null) {
        if (value != 0) {
          secondNumber = value;
          // makes the current number typed show in the bigger font
          updateDisplay(firstNumber, secondNumber, currentOperation);
          return;
        }
      }

      if (firstNumber && currentOperation && secondNumber) {
        secondNumber += value;
        // makes the current number typed show in the bigger font
        updateDisplay(firstNumber, secondNumber, currentOperation);
        return;
      }
    });
  });

  operationButtons.forEach((operationButton) => {
    operationButton.addEventListener("click", (event) => {
      let op = event.target.id;
      if (firstNumber && secondNumber && currentOperation) {
        showResult();
      }

      if (firstNumber) {
        currentOperation = op;
      }
    });
  });
})();
