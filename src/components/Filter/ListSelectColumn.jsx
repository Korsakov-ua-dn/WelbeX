import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterName } from "../../store/reducers/orders-reducer";

const ListSelectColumn = () => {
    const dispatch = useDispatch();
    const filterName = useSelector(s => s.orders.filterName);
    
    const onClickFilterColumnHandler = (e) => {
        if (e.target.tagName === "INPUT") {
            dispatch(setFilterName(e.target.value))
        }
    }
    
    return (
        <div className='list column'>
            <div onClick={onClickFilterColumnHandler} className='list__item'>
                <input defaultChecked={filterName === "date"} id="date" type="radio" value="date" name="column"/>
                <label htmlFor="date">Date</label>
            </div>
            <div onClick={onClickFilterColumnHandler} className='list__item'>
                <input defaultChecked={filterName === "name"} id="name" type="radio" value="name" name="column"/>
                <label htmlFor="name">Name</label>
            </div>
            <div onClick={onClickFilterColumnHandler} className='list__item'>
                <input defaultChecked={filterName === "amount"} id="amount" type="radio" value="amount" name="column"/>
                <label htmlFor="amount">Amount</label>
            </div>
            <div onClick={onClickFilterColumnHandler} className='list__item'>
                <input defaultChecked={filterName === "distance"} id="distance" type="radio" value="distance" name="column"/>
                <label htmlFor="distance">Distance</label>
            </div>
        </div>
    )
}

export default React.memo(ListSelectColumn);