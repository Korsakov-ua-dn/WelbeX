import { useDispatch, useSelector } from "react-redux";
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";
import styled from 'styled-components';
import { useEffect } from "react";
import { getOrdersTC } from "./store/reducers/orders-reducer";
import ServerError from "./components/ServerError/ServerError";

const App = () => {
  const dispatch = useDispatch();
  const isServerError = useSelector(s => s.orders.isServerError);

  useEffect(() => {
    dispatch(getOrdersTC())
  }, [dispatch])

  return (
    <>
      <StyledMain>
        <div className="container">
          <Table/>
        </div>
        <div className="container">
          <Filter/>
        </div>
      </StyledMain>
      { isServerError && <ServerError/> }
    </>
  );
}

export default App;

const StyledMain = styled.main`
  margin: auto;
  padding: 24px;
  width: 100%;
  min-height: 100vh;
  max-width: 1024px;
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 30px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
  }
  
  & .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
