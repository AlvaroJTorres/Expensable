import { useState } from "react";
import { useCalculator } from "../hooks/useCalculator";
import { newTransaction } from "../services/transactions_service";
import { format } from "date-fns";
import CalendarDate from "./CalendarDate";
import CategoryTag from "./CategoryTag";
import NumPad from "./NumPad";
import Screen from "./Screen";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function NewTransactionForm({
  category,
  currentDate,
  dispatch,
}) {
  const [
    prevNumber,
    operator,
    currentNumber,
    handleNumberClick,
    handleOperatorClick,
    handleOperation,
    handleDelete,
    handleClear,
  ] = useCalculator();
  const [display, setDisplay] = useState(false);
  const [startDate, setStartDate] = useState(new Date(currentDate));

  function toggleDisplay() {
    setDisplay(!display);
  }

  async function handleSubmit() {
    const token = localStorage.getItem("token");
    const transactionData = {
      amount: currentNumber,
      date: format(startDate, "yyyy-MM-dd"),
    };
    const newTransactionData = await newTransaction(
      category.id,
      token,
      transactionData
    );
    if (newTransactionData.status === "error") {
      alert(newTransactionData.message);
    } else {
      console.log(newTransactionData);
      dispatch({ type: "closed" });
      window.location.reload();
    }
  }

  return (
    <div>
      <CategoryTag category={category} dispatch={dispatch} />
      <Screen
        prevNumber={prevNumber}
        operator={operator}
        currentNumber={currentNumber}
        opClick={handleOperatorClick}
        numClick={handleNumberClick}
        submit={handleSubmit}
        calculate={handleOperation}
        del={handleDelete}
        clear={handleClear}
      />
      <NumPad
        operator={operator}
        opClick={handleOperatorClick}
        numClick={handleNumberClick}
        submit={handleSubmit}
        calculate={handleOperation}
        del={handleDelete}
        clear={handleClear}
        color={category.color}
        toggleDisplay={toggleDisplay}
      />
      <CalendarDate date={startDate} />
      {display && (
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            toggleDisplay();
          }}
          inline
        />
      )}
    </div>
  );
}
