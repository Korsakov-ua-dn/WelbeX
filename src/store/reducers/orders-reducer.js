import { ordersAPI } from "../../api/api";

const initialState = {
    isServerError: '',
    isPreloader: true,
    orders: [],
    totalCount: null,
    page: 1,
    count: 5,
    filterName: null,
    filterCondition: null,
    filterValue: '',
    sortName: null,
  };

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ORDERS/SET_SERVER_ERROR":
      case "ORDERS/SET_PRELOADER":
      case "ORDERS/SET_ORDERS":
      case "ORDERS/SET_TOTALCOUNT":
      case "ORDERS/SET_FILTER-NAME":
      case "ORDERS/SET_FILTER-CONDITION":
      case "ORDERS/SET_FILTER-VALUE":
      case "ORDERS/SET_SORT-NAME":
      case "ORDERS/SET_CURRENT-PAGE":
        return { ...state, ...action.payload };
  
      default:
        return state;
    }
  };

//actions
export const setServerError = (isServerError) => ({
    type: "ORDERS/SET_SERVER_ERROR",
    payload: { isServerError },
  });

export const setPreloader = (isPreloader) => ({
    type: "ORDERS/SET_PRELOADER",
    payload: { isPreloader },
  });

export const setOrders = (orders) => ({
    type: "ORDERS/SET_ORDERS",
    payload: { orders },
  });

export const setTotalCount = (totalCount) => ({
    type: "ORDERS/SET_TOTALCOUNT",
    payload: { totalCount },
  });

export const setFilterName = (filterName) => ({
    type: "ORDERS/SET_FILTER-NAME",
    payload: { filterName },
  });

export const setFilterCondition = (filterCondition) => ({
    type: "ORDERS/SET_FILTER-CONDITION",
    payload: { filterCondition },
  });

export const setFilterValue = (filterValue) => ({
    type: "ORDERS/SET_FILTER-VALUE",
    payload: { filterValue },
  });

export const setSortName = (sortName) => ({
    type: "ORDERS/SET_SORT-NAME",
    payload: { sortName },
  });

export const setCurrentPage = (page) => ({
    type: "ORDERS/SET_CURRENT-PAGE",
    payload: { page },
  });
  
//thunk
export const getOrdersTC = () => (dispatch, getState) => {
  const { page, count, filterName, filterCondition, filterValue, sortName } = getState().orders

  dispatch(setPreloader(true));

  ordersAPI
    .getAllUser({ page, count, filterName, filterCondition, filterValue, sortName })
      .then((res) => {
        dispatch(setOrders(res.data.orders));
        dispatch(setTotalCount(res.data.totalCount));
      })
      .catch((e) => {
        const errorMessage = e.message || "Something went wrong";
        dispatch(setServerError(errorMessage));
        setTimeout(() => {
          dispatch(setServerError(''));
        }, 3000);
      })
      .finally(() => {
        dispatch(setPreloader(false));
      });
};