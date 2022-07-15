import React  from "react";
import styled from 'styled-components';
import { variables } from "../../utils/variables";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as SortArrow } from '../../assets/sort.svg';
import { setSortName } from '../../store/reducers/orders-reducer';
import { useCallback } from 'react';
import { getOrdersTC } from "../../store/reducers/orders-reducer";
import Pagination from '../Pagination/Pagination';

const Table = () => {
    const dispatch = useDispatch();
    const orders = useSelector(s => s.orders.orders);
    const sortName = useSelector(s => s.orders.sortName);
    const isPreloader = useSelector(s => s.orders.isPreloader)

    // единственный обработчик события для сортировки по колонкам
    const sortColumnHandler = useCallback((e) => {
        if (e.target.tagName === "svg") {
            dispatch(setSortName(e.target.getAttribute('data-name')));
            dispatch(getOrdersTC());
        }
        if (e.target.tagName === "path") {
            dispatch(setSortName(e.target.farthestViewportElement.getAttribute('data-name')));
            dispatch(getOrdersTC());
        }
    }, [dispatch]);

    return (
        <>
            <StyledTable className="table">
                <div onClick={sortColumnHandler} className="table__row header">
                    <div className="ceil header__ceil">Date</div>
                    <div className="ceil header__ceil">Name
                        <SortArrow data-name='name' className={`${sortName === 'name' ? 'active' : ''} header__sortIcon`}/>
                    </div>
                    <div className="ceil header__ceil">Amount
                        <SortArrow data-name='amount' className={`${sortName === 'amount' ? 'active' : ''} header__sortIcon`}/>
                    </div>
                    <div className="ceil header__ceil">Distance
                        <SortArrow data-name='distance' className={`${sortName === 'distance' ? 'active' : ''} header__sortIcon`}/>
                    </div>
                </div>
            
                { orders.length 
                    ?   <div className="body">
                            { orders.map(item => <TableItem key={item._id} item={item}/>) }
                        </div> 
                    :   <span className="notFound">{ isPreloader ? "Loading..." : "Not found results" }</span>
                }
                
            </StyledTable>
            <Pagination/>
        </>
    )
}

export default React.memo(Table);

const TableItem = ({ item }) => {
    return (
        <div className='table__row'>
            <div className='ceil body__ceil'>{item.date}</div>
            <div className='ceil body__ceil'>{item.name}</div>
            <div className='ceil body__ceil'>{item.amount}</div>
            <div className='ceil body__ceil'>{item.distance}</div>
        </div>
    )
}

const StyledTable = styled.div`
    position: relative;
    min-height: 301px;
    width: 100%;
    overflow: hidden;
    border-top: 1px solid ${variables.borderColor};
    margin-bottom: 20px;

    & .table__row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    & .ceil {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid ${variables.borderColor};
        border-right: 1px solid ${variables.borderColor};
    }

    & .header {
        background-color: ${variables.backgroundColor};
        border-left: 1px solid ${variables.borderColor};
    }

    & .header__ceil {
        font-size: 16px;
        font-weight: 700;
    }

    & .header__sortIcon {
        margin-left: 5px;
        cursor: pointer;

        &.active path {
            fill: ${variables.accentColor};
        }
    }

    & .body {
        background-color: ${variables.backgroundLightColor};
        border-left: 1px solid ${variables.borderColor};
    }

    & .body__ceil {
        font-size: 14px;
    }

    & .notFound {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 250px;
    }
`

