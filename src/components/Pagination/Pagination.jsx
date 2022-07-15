import React  from "react";
import styled from 'styled-components';
import { variables } from "../../utils/variables";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersTC, setCurrentPage } from '../../store/reducers/orders-reducer';
import { useCallback } from 'react';

const Pagination = () => {
    const dispatch = useDispatch();
    const totalCount = useSelector(s => s.orders.totalCount);
    const page= useSelector(s => s.orders.page);
    const count = useSelector(s => s.orders.count);

    const clickPageHandler = useCallback((clickPage) => {
        dispatch(setCurrentPage(clickPage));
        dispatch(getOrdersTC());
    }, [dispatch]);

    const countOfPages = Math.ceil(totalCount / count);

    const getPages = () => {
        let pages = [];
        const addPage = (i) => pages.push(<li onClick={() => clickPageHandler(i)} className={page === i ? 'active' : ''} key={i}>{i}</li>);

        for (let i = 1; i <= countOfPages; i++) {

            if (countOfPages <= 3) { addPage(i) } else 
            if (page == 1 && i <= 3) { addPage(i) } else 
            if (page == countOfPages && i >= countOfPages - 2) { addPage(i)} else 
            if (i >= page - 1 && i <= page + 1) { addPage(i)}
                    
        }
        return pages;
    };

    if (!totalCount) return <div style={{height: "35px"}}/>;
 
    return (
        <StyledPagination className="pagination">
            <li onClick={() => clickPageHandler(page - 1)} className={`${page == 1 ? 'disable' : ''}`}>&laquo;</li>
            
            { getPages() }
            
            <li onClick={() => clickPageHandler(page + 1)} className={`${page == countOfPages ? 'disable' : ''}`}>&raquo;</li>
        </StyledPagination>
    )
}

export default React.memo(Pagination);

const StyledPagination = styled.ul`
    &.pagination {
        display: inline-block;
    }
    
    &.pagination li {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
        cursor: pointer;
    }
    
    &.pagination li.active {
        background-color: ${variables.accentColor};
        color: white;
        pointer-events: none;
    }
    
    &.pagination li:hover:not(.active) {background-color:  ${variables.backgroundColor};}

    &.pagination li.disable {
        pointer-events: none;
    }
`