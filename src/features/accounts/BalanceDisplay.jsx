import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const balnace = useSelector((store) => store.account.balance);
  console.log(balnace)
  return <div className="balance">${balnace}</div>;
  // return <div className="balance">{formatCurrency(123456)}</div>;
}

export default BalanceDisplay;
