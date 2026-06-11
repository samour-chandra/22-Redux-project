const inisialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoding: false,
};

export default function accountReducer(state = inisialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoding: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.balance > 30) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return { ...state, loanPurpose: "", balance: state.balance - state.loan };
    case "account/convertingCurrency":
      return { ...state, isLoding: true };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  } else {
    console.log("hello");
    return async function (dispatch, getState) {
      dispatch({ type: "account/convertingCurrency" });
      // api call
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD&amount=${amount}`,
      );
      const data = await res.json();
      const converted = data.rates.USD;
      dispatch({ type: "account/deposit", payload: converted });
    };
  }
}
export function Withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
export function payLoan(amount) {
  return { type: "account/payLoan", payload: amount };
}
