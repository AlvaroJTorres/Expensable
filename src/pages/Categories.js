import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as Plus } from "../icons/plus.svg";
import { Card } from "../components/Card";
import SidebarNav from "../components/SidebarNav";
import { getCategories } from "../services/categories_service";
import { add, format } from "date-fns";
import TransactionsSidebar from "../components/TransactionsSidebar";
import NewCategoriesForm from "../components/NewCategoriesForm";
import Modal from "../components/Modal";
import NewTransactionForm from "../components/NewTransactionForm";
import { ReactComponent as Right } from "../icons/right.svg";
import { ReactComponent as Left } from "../icons/left.svg";

const StyledCardsContainer = styled.div`
  ${tw`grid grid-cols-3 auto-rows-auto gap-x-2 gap-y-2.5 p-10`}
`;

const StyledNewButton = styled.div`
  ${tw`flex items-center justify-center border-2 border-stone-400 border-dashed rounded-lg py-4`}
`;

const initialState = {
  currentDate: new Date("September, 2021"),
  modal: "closed",
};

function modalReducer(state, action) {
  switch (action.type) {
    case "transaction":
      return { ...state, modal: "transaction" };
    case "category":
      return { ...state, modal: "category" };
    case "closed":
      return { ...state, modal: "closed" };
    default:
      throw new Error();
  }
}

function dateReducer(state, action) {
  switch (action.type) {
    case "increase":
      return { ...state, currentDate: add(state.currentDate, { months: 1 }) };
    case "decrease":
      return { ...state, currentDate: add(state.currentDate, { months: -1 }) };
    default:
      throw new Error();
  }
}

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("expense");
  const [currentCategory, setCurrentCategory] = useState([]);
  const [state, dispatch] = useReducer(dateReducer, initialState);
  const [s2, d2] = useReducer(modalReducer, initialState);

  useEffect(() => {
    const showCategories = async () => {
      const token = localStorage.getItem("token");
      const categoriesData = await getCategories(token);
      if (categoriesData.status === "error") {
        alert(categoriesData.message);
      } else {
        setCategories(categoriesData);
      }
    };
    showCategories();
  }, []);

  function handleTypeChange(e) {
    setType(e.target.value);
  }

  function filterCategories(categories) {
    return categories.filter((category) => category.transaction_type === type);
  }

  function totalTransactions(categories) {
    return filterCategories(categories)
      .map((category) => filterTransactions(category.transactions))
      .reduce((a, b) => a + b, 0);
  }

  function filterTransactions(transactions) {
    let tr = transactions.filter(
      (transaction) =>
        transaction.date.slice(0, -3) === format(state.currentDate, "yyyy-MM")
    );
    return addTransactions(tr);
  }

  function addTransactions(transactions) {
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  }

  function handleNewTransaction(category) {
    setCurrentCategory(category);
    d2({ type: "transaction" });
  }

  return (
    <div className="flex h-screen">
      <SidebarNav />
      <div className="px-8 py-6">
        {categories ? (
          <div className="flex flex-col">
            <h1 className="text-gray-900 sm:text-2xl">Categories</h1>
            <div onChange={(e) => handleTypeChange(e)}>
              <input type="radio" value="expense" name="type" />
              Expenses
              <input type="radio" value="income" name="type" />
              Income
            </div>
            <div>
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex gap-8">
                  <button
                    className="rounded-full p-2 bg-gray-100"
                    onClick={() => dispatch({ type: "increase" })}
                  >
                    <Left />
                  </button>
                  <div className="rounded-lg py-2 px-3 bg-gray-100 text-sm">
                    {format(state.currentDate, "MMMM yyyy")}
                  </div>
                  <button
                    className="rounded-full p-2 bg-gray-100"
                    onClick={() => dispatch({ type: "decrease" })}
                  >
                    <Right />
                  </button>
                </div>
                <h1 className="text-red-500 text-4xl">
                  $ {totalTransactions(categories)}
                </h1>
                <div className="text-gray-500">
                  Total {type === "expense" ? "Expenses" : "Income"}
                </div>
              </div>
              <StyledCardsContainer>
                {filterCategories(categories).map((category) => (
                  <Card
                    key={category.name}
                    color={category.color}
                    icon={category.icon}
                    name={category.name}
                    amount={filterTransactions(category.transactions)}
                    onClick={() => handleNewTransaction(category)}
                  />
                ))}
                <StyledNewButton
                  value={true}
                  onClick={() => d2({ type: "category" })}
                >
                  {<Plus />}
                </StyledNewButton>
              </StyledCardsContainer>
            </div>
          </div>
        ) : (
          <div>LOADING</div>
        )}
      </div>
      <TransactionsSidebar
        categories={categories}
        currentDate={format(state.currentDate, "yyyy-MM")}
      />
      {s2.modal === "category" && (
        <Modal>
          <NewCategoriesForm dispatch={d2} type={type} />
        </Modal>
      )}
      {s2.modal === "transaction" && (
        <Modal>
          <NewTransactionForm
            dispatch={d2}
            category={currentCategory}
            currentDate={state.currentDate}
          />
        </Modal>
      )}
    </div>
  );
}
