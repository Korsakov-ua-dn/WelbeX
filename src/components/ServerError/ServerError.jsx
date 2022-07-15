import React  from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { variables } from "../../utils/variables";

const ServerError = () => {
    const isServerError = useSelector(s => s.orders.isServerError);

    return (
        <StyledServerError className='serverError'>
            {isServerError}
        </StyledServerError>
    )
}

export default ServerError;

const StyledServerError = styled.div`
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
    height: 40px;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${variables.accentColor};
    color: #ffffff;
    border-radius: 4px;
`