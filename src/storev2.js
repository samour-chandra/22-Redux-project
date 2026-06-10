

import { combineReducers, createStore } from "redux";

const inisialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const inisialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = inisialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
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
    default:
      return state;
  }
}

function customerReducer(state = inisialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 480 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 500, purpose: "Buy a car" },
// });

// console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function Withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan(amount) {
  return { type: "account/payLoan", payload: amount };
}

store.dispatch(deposit(20));
store.dispatch(requestLoan(50000, "buy a goad bar"));
store.dispatch(payLoan(20));
// console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toDateString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateCustomer", payload: fullName };
}

store.dispatch(createCustomer("samor",25445));

console.log(store.getState());
