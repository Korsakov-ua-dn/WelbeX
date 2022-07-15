import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterCondition } from "../../store/reducers/orders-reducer";

const ListSelectCondition = () => {
    const dispatch = useDispatch();
    const filterCondition = useSelector(s => s.orders.filterCondition);
    
    const onClickFilterConditionHandler = (e) => {
        if (e.target.tagName === "INPUT") {
            dispatch(setFilterCondition(e.target.value))
        }
    }
    
    return (
        <div className='list condition'>
            <div onClick={onClickFilterConditionHandler} className='list__item'>
                <input defaultChecked={filterCondition === "="} id="equals" type="radio" value="=" name="condition"/>
                <label htmlFor="equals">Equals</label>
            </div>
            <div onClick={onClickFilterConditionHandler} className='list__item'>
                <input defaultChecked={filterCondition === "contain"} id="contain" type="radio" value="contain" name="condition"/>
                <label htmlFor="contain">Contain</label>
            </div>
            <div onClick={onClickFilterConditionHandler} className='list__item'>
                <input defaultChecked={filterCondition === ">"} id="more" type="radio" value=">" name="condition"/>
                <label htmlFor="more">More</label>
            </div>
            <div onClick={onClickFilterConditionHandler} className='list__item'>
                <input defaultChecked={filterCondition === "<"} id="less" type="radio" value="<" name="condition"/>
                <label htmlFor="less">Less</label>
            </div>
        </div>
    )
}

export default React.memo(ListSelectCondition);