export const getProductFromLocalStorage = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("product")) {
      return JSON.parse(localStorage.getItem("product"));
    } else {
      return false;
    }
  };
  