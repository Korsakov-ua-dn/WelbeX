import preloaderImg from "../../assets/preloader.svg";
import styled from 'styled-components';
import { useSelector } from "react-redux";

const Preloader = () => {

    const preloader = useSelector(s => s.orders.isPreloader)
    if (!preloader) return null

    return (
        <StyledPreloader className="spinner">
            <div className="spinner__wrapper">
                <img className="spinner__img" srcSet={preloaderImg} alt="spinner"/>
            </div>
        </StyledPreloader>
    )
}

export default Preloader;

const StyledPreloader = styled.div`
    &.spinner {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    & .spinner__wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
    }

    & .spinner__img {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`