import styled from "styled-components";
import tw from "twin.macro";
import { format } from "date-fns";
import { DatedTransactions } from "../helpers/utils";
import { StyledIcon } from "./Card";
import { ICONS } from "../app/config";
import { useState } from "react";
import { ReactComponent as Filter } from "../icons/filter.svg";

const StyledTransactionSidebar = styled.div`
  ${tw`flex flex-col gap-4 px-8 pt-6 border-l-2 border-gray-200`};
`;

const StyledTransactionScroller = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  ${tw`overflow-y-auto`};
`;

const StyledDailyTransactionContainer = styled.div`
  ${tw`flex flex-col `}
`;

const StyledDayTransactionContainer = styled.div`
  ${tw`flex bg-gray-50 border-t-2 border-gray-200 gap-4 p-4`}
`;

const StyledNumericalDay = styled.h2`
  ${tw`text-2xl text-gray-900`}
`;

const StyledInfoContainer = styled.div`
  ${tw`flex flex-col`}
`;

const StyledDateText = styled.h3`
  color: ${(props) => (props.txColor === "dark" ? "#111827" : "#6B7280")};
  ${tw`text-sm`}
`;

const StyledTotalTransaction = styled.h2`
  ${tw`text-xl text-red-500`}
`;

const StyledTransactionContainer = styled.div`
  ${tw`flex border-t-2 border-gray-200 items-center gap-4 p-4`}
`;

export default function TransactionsSidebar({ categories, currentDate }) {
  const [filter, setFilter] = useState("");
  const [display, setDisplay] = useState(false);
  const transactionsList = DatedTransactions(categories, currentDate);

  function handleFilter(date) {
    setFilter(date);
  }

  function filterTransactionsPerDay(transactions) {
    return transactions.filter((transaction) =>
      filter ? transaction.date === filter : transaction.date
    );
  }

  function handleDisplay() {
    setDisplay(!display);
  }

  return (
    <StyledTransactionSidebar>
      <div className="flex justify-between px-8">
        <div className="text-gray-900 text-2xl">Transactions</div>
        <button onClick={handleDisplay}>
          <Filter />
        </button>
      </div>
      {display && (
        <div className="flex flex-col">
          <p onClick={() => handleFilter("")}>None</p>
          {transactionsList.map((transaction) => (
            <p
              key={transaction.date}
              onClick={() => handleFilter(transaction.date)}
            >
              {transaction.date}
            </p>
          ))}
        </div>
      )}
      <StyledTransactionScroller>
        {filterTransactionsPerDay(transactionsList).map((transaction) => (
          <StyledDailyTransactionContainer key={transaction.date}>
            <StyledDayTransactionContainer>
              <StyledNumericalDay>
                {format(new Date(`${transaction.date} `), "dd")}
              </StyledNumericalDay>
              <StyledInfoContainer>
                <StyledDateText>
                  {format(new Date(`${transaction.date} `), "EEEE")}
                </StyledDateText>
                <StyledDateText txColor={"dark"}>
                  {format(new Date(`${transaction.date} `), "MMMM, yyyy")}
                </StyledDateText>
              </StyledInfoContainer>
              <StyledTotalTransaction>
                {transaction.transactions.reduce(
                  (acc, curr) =>
                    curr.transaction_type === "income"
                      ? acc + curr.amount
                      : acc - curr.amount,
                  0
                )}
              </StyledTotalTransaction>
            </StyledDayTransactionContainer>
            {transaction.transactions.map((transaction) => (
              <StyledTransactionContainer key={transaction.id}>
                <StyledIcon inputColor={transaction.color}>
                  {ICONS[transaction.icon]}
                </StyledIcon>
                <StyledInfoContainer>
                  <StyledDateText txColor={"dark"}>
                    {transaction.name}
                  </StyledDateText>
                  <StyledDateText>
                    {transaction.notes ? transaction.notes : "No notes"}
                  </StyledDateText>
                </StyledInfoContainer>
                {transaction.transaction_type === "income" ? (
                  <StyledTotalTransaction>
                    $ {transaction.amount}
                  </StyledTotalTransaction>
                ) : (
                  <StyledTotalTransaction>
                    -$ {transaction.amount}
                  </StyledTotalTransaction>
                )}
              </StyledTransactionContainer>
            ))}
          </StyledDailyTransactionContainer>
        ))}
      </StyledTransactionScroller>
    </StyledTransactionSidebar>
  );
}
