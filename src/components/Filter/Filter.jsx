import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { getOrdersTC, setCurrentPage } from "../../store/reducers/orders-reducer";
import { variables } from "../../utils/variables";
import ListSelectColumn from './ListSelectColumn';
import ListSelectCondition from './ListSelectCondition';
import TextField from "./TextField";

const Filter = () => {
    const dispatch = useDispatch();
    const filterName = useSelector(s => s.orders.filterName);
    const filterCondition = useSelector(s => s.orders.filterCondition);
    const filterValue = useSelector(s => s.orders.filterValue);

    // валидация текстового поля: 'amount' и 'distance' принимают только цифры
    const [filterValueError, setFilterValueError] = useState(false);
    useEffect(() => {
        if ( filterName == 'amount' || filterName == 'distance') {
            setFilterValueError(!filterValue.match(/^[0-9]*$/));
        } else {
            filterValueError && setFilterValueError(false);
        }
    }, [filterValue, filterName])

    // открытие настроек фильтра: toggle переключатель
    const [isOpen, setOpen] = useState(false);
    const openFilterHandler = () => {
        setOpen(!isOpen)
    }

    // disable кнопки подтверждения настроек фильтра если не все поля заполнены или есть ошибка
    const disableSubmit = !filterName || !filterCondition || !filterValue || filterValueError
    const classnameSubmit = `${ disableSubmit ? 'disable' : ''} list submit`
    const onSubmitHandler = () => {
        dispatch(getOrdersTC());
        dispatch(setCurrentPage(1));
    }

    return (
        <FilterWrapper className={isOpen ? 'filter open' : 'filter'}>
            <button className='btn' onClick={openFilterHandler}>Filter</button>
            <ListSelectColumn/>
            <ListSelectCondition/>
            <TextField error={filterValueError}/>
            <button 
                disabled={disableSubmit} 
                className={classnameSubmit}
                onClick={onSubmitHandler}
                >Apply filter
            </button>
        </FilterWrapper>
    )
}

export default Filter;

const FilterWrapper = styled.div`
    position: relative;
    height: 356px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;

    & .btn {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background-color: ${variables.accentColor};
        height: 50px;
        border-radius: 4px;
        color: #ffffff;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 1.5px;
        z-index: 10;
    }

    & .list {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100px;
        border: 1px solid ${variables.borderColor};
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 10px;
        z-index: 1;

        & label {
            margin-left: 10px;
            font-size: 14px;
        }
    }

    & .list__item {
        width: 100%;
        display: flex;
        align-items: center;
    }

    & .column {
        top: -265px;
        transition: top 0.3s linear;
    }

    &.open .column {
        top: 55px;
        transition: top 0.3s linear;
    }

    & .condition {
        top: -160px;
        transition: top 0.3s linear;
    }

    &.open .condition {
        top: 160px;
        transition: top 0.3s linear;
    }

    & .search_text {
        top: -55px;
        transition: top 0.3s linear;

        &.error {
            border: 1px solid ${variables.accentColor};
        }
    } 

    &.open .search_text {
        top: 265px;
        transition: top 0.3s linear;
        height: 36px;
        cursor: auto;
        font-size: 14px;

        &::placeholder {
            font-size: 14px;
            color: ${variables.borderColor}
        }
    }

    & .submit {
        height: 50px;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #ffffff;
        font-weight: 700;
        letter-spacing: 1.5px;
        top: -160px;
        transition: top 0.3s linear;
        background-color: ${variables.blueColor};
    }

    & .submit.disable {
        background-color: ${variables.borderColor};
    }

    &.open .submit {
        top: 306px;
        transition: top 0.3s linear;
    }
`