import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [calType, setCalType] = useState("isPrime");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    let roundedValue;
    if (value === "" || isNaN(value)) {
      setInputValue(value);
    } else if (value.includes("-")) {
      const check = /\d/.test(value);
      if (check) {
        // input is negative
        roundedValue = 1;
        setInputValue(roundedValue);
        calculateResult(roundedValue, calType);
      } else {
        setInputValue(value);
      }
    } else if (value === "0") {
      // input is 0
      roundedValue = 0;
      setInputValue(roundedValue);
      calculateResult(roundedValue, calType);
    } else {
      // input is positive number
      roundedValue = Math.max(1, Math.round(parseFloat(value)));
      setInputValue(roundedValue);
      calculateResult(roundedValue, calType);
    }
  };

  const handleCalChange = (event) => {
    const value = event.target.value;
    const checknum = /^[0-9]*$/.test(inputValue);
    // check symbol
    if (checknum) {
      setCalType(value);
      calculateResult(inputValue, value);
    }
    setCalType(value);
  };

  const calculateResult = (number, type) => {
    if (type === "isPrime") {
      const isPrime = checkPrime(number);
      setResult(isPrime.toString());
    } else if (type === "isFibonacci") {
      const isFibonacci = checkFibonacci(number);
      setResult(isFibonacci.toString());
    }
  };

  const checkPrime = (num) => {
    if (num <= 1) {
      return false;
    }
    if (num <= 3) {
      return true;
    }

    if (num % 2 === 0 || num % 3 === 0) {
      return false;
    }

    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) {
        return false;
      }
      i += 6;
    }

    return true;
  };

  const checkFibonacci = (num) => {
    if (num === 0 || num === 1) {
      return true;
    }

    let prev = 0;
    let cur = 1;

    while (cur <= num) {
      if (cur === num) {
        return true;
      }
      const next = prev + cur;
      prev = cur;
      cur = next;
    }

    return false;
  };

  return (
    <div className="App">
      <div className="row">
        <div className="first-column">
          <input value={inputValue} onChange={handleInputChange} />
        </div>
        <div className="center-column">
          <select value={calType} onChange={handleCalChange}>
            <option value="isPrime">isPrime</option>
            <option value="isFibonacci">isFibonacci</option>
          </select>
        </div>
        <div className="last-column">{result}</div>
      </div>
    </div>
  );
}

export default App;
