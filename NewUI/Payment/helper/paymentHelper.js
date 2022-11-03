export const getOrderDetails = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("payment")) {
      return JSON.parse(localStorage.getItem("payment"));
    } else {
      return false;
    }
  };
  