export function filterTransactionsPerMonth(categories, date) {
  return categories.map((category) => {
    return (category = {
      ...category,
      transactions: category.transactions.filter(
        (transaction) => transaction.date.slice(0, -3) === date
      ),
    });
  });
}

function extractTransactionsWithCategory(categories) {
  return categories
    .map((category) => {
      return category.transactions.map((transaction) => {
        return {
          ...transaction,

          id: category.id,
          name: category.name,
          transaction_type: category.transaction_type,
          color: category.color,
          icon: category.icon,
        };
      });
    })
    .flat();
}

function organizetransactionsPerDate(transactions) {
  return transactions.reduce((acc, curr) => {
    acc[curr.date] ? acc[curr.date].push(curr) : (acc[curr.date] = [curr]);
    return acc;
  }, {});
}

function orderTransactionsPerDay(transactions) {
  return Object.entries(transactions)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
    .map((transaction) => {
      return (transaction = {
        date: transaction[0],
        transactions: transaction[1],
      });
    });
}

export function DatedTransactions(categories, date) {
  return orderTransactionsPerDay(
    organizetransactionsPerDate(
      extractTransactionsWithCategory(
        filterTransactionsPerMonth(categories, date)
      )
    )
  );
}
