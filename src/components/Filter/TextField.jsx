import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterValue } from "../../store/reducers/orders-reducer";

const TextField = ({ error }) => {
    const dispatch = useDispatch();
    const filterValue = useSelector(s => s.orders.filterValue);
    
    const changeInputValueHandler = (e) => {
        dispatch(setFilterValue(e.currentTarget.value));
    }
    
    return (
        <input 
            className={`${error ? 'error' : ''} list search_text`}
            onChange={changeInputValueHandler} 
            type="text" 
            placeholder="Search text"
            value={filterValue}/>
    )
}

export default React.memo(TextField);