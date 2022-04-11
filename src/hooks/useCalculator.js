import { useState } from "react";

export function useCalculator() {
  const [prevNumber, setPrevNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [currentNumber, setCurrentNumber] = useState("0");

  function handleNumberClick(n) {
    let num;
    if (n === "0" && (currentNumber === "0" || currentNumber === " "))
      num = "0";
    else if (n === "." && (currentNumber === "0" || currentNumber === " "))
      num = `0${n}`;
    else if (currentNumber === "0") num = `${n}`;
    else if (currentNumber.includes(".") && n === ".") return;
    else num = `${currentNumber}${n}`;
    setCurrentNumber(num);
  }

  function handleOperatorClick(op) {
    if (!operator) {
      setOperator(op);
      setPrevNumber(currentNumber);
      setCurrentNumber(" ");
    } else {
      setOperator(op);
    }
  }

  function handleOperation() {
    let result;
    switch (operator) {
      case "+":
        if (currentNumber === " ") {
          result = +prevNumber * 2;
        } else {
          result = +prevNumber + +currentNumber;
        }
        break;
      case "-":
        if (currentNumber === " ") {
          result = 0;
        } else {
          result = +prevNumber - +currentNumber;
        }
        break;
      case "*":
        if (currentNumber === " ") {
          result = +prevNumber * +prevNumber;
        } else {
          result = +prevNumber * +currentNumber;
        }
        break;
      case "÷":
        if (currentNumber === " ") {
          result = 1;
        } else {
          result = +prevNumber / +currentNumber;
        }
        break;
      default:
        break;
    }
    setCurrentNumber(
      `${Math.abs(Math.round((result + Number.EPSILON) * 100) / 100)}`
    );
    setOperator(null);
    setPrevNumber(null);
  }

  function handleDelete() {
    if (currentNumber.length === 1 && prevNumber == null && operator == null) {
      setCurrentNumber("0");
    } else if (
      currentNumber.length === 2 &&
      prevNumber != null &&
      operator != null
    ) {
      setCurrentNumber(" ");
    } else if (
      currentNumber === " " &&
      prevNumber != null &&
      operator != null
    ) {
      setCurrentNumber(prevNumber);
      setPrevNumber(null);
      setOperator(null);
    } else {
      setCurrentNumber(currentNumber.slice(0, -1));
    }
  }

  function handleClear() {
    setPrevNumber(null);
    setOperator(null);
    setCurrentNumber("0");
  }

  return [
    prevNumber,
    operator,
    currentNumber,
    handleNumberClick,
    handleOperatorClick,
    handleOperation,
    handleDelete,
    handleClear,
  ];
}
