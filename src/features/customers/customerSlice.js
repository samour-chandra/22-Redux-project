const inisialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};


export default function customerReducer(state = inisialStateCustomer, action) {
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
    export function createCustomer(fullName, nationalId) {
      return {
        type: "customer/createCustomer",
        payload: { fullName, nationalId, createdAt: new Date().toDateString() },
      };
    }
    
    export function updateName(fullName) {
      return { type: "customer/updateCustomer", payload: fullName };
    }