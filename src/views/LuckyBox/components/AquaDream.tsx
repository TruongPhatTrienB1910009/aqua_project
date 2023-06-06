import styled from "styled-components";
import { Text, Flex, Button } from "@pancakeswap/uikit"
import CardAquaDream from "./CardAquaDream";

const AquaDream = () => {
    return (
        <CsFlexContainer width="100%" flexDirection="column" mt="3rem" height="auto" minHeight="50vh">
            <CsFlex>
                <CardAquaDream
                    nftImage="https://image.lexica.art/full_jpg/8f066c35-56fe-49da-bb1a-80687491a5d3"
                    nftPrice={20}
                    nftName="Octopus"
                />
                <MainContent>
                    <h1>Total: 2500 minted</h1>
                    <img src="/images/logo.png" alt="" />
                    <p>Exploring the Deep Sea of BASE NFTs</p>
                    <AnimationButton>Mint</AnimationButton>
                </MainContent>
            </CsFlex>
        </CsFlexContainer>
    )
}

export default AquaDream




const CustomFlex = styled(Flex)`
    margin-bottom:1.5rem;
    .pagination{
        display:flex;
        flex-direction: row;
        width:500px;
        justify-content:space-around;
        align-items:center;
        @media screen and (max-width: 600px){
            width: 100%;
        }
        *{
            list-style-type: none;
        }
    }
    .page-link {
        background:${({ theme }) => theme.colors.tertiary};
        padding:12px;
        border-radius:5px !important;
        border:none !important;
        color:${({ theme }) => theme.colors.text};
        &:focus {
            box-shadow:none !important;
        }
        &:hover{
            background:${({ theme }) => theme.colors.backgroundTab};
        }
    }
    .page-item.disabled .page-link{
        background:${({ theme }) => theme.colors.disabled};
        cursor: not-allowed! important;
        opacity: 0.7;
        pointer-events:none;
    }
    .page-item.active .page-link{
        background:${({ theme }) => theme.colors.primaryBright};
        color:#fff;
    }
`
const CsFlex = styled(Flex)`    
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 30px;
@media screen and (min-width: 769px) and (max-width: 1024px){
    width: 80%;
    justify-content: space-evenly;
    column-gap: 0px;
    padding: 0px;
}
@media screen and (max-width: 768px){
    justify-content: space-between;
    column-gap: 0px;
    padding: 0px;
}
@media screen and (max-width: 600px){
    justify-content: center;
    gap: 0px;
    padding: 0px 10px;
}
`
const CsFlexContainer = styled(Flex)`
    @media screen and (min-width: 769px) and (max-width: 1024px){
        align-items: center;
    }
`

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    height: 320px;
    background: transparent;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    color: #000000;
    h1{
        font-size: 24px;
    }

    img {
        max-width: 180px;
        height: 180px
    }

    p {
        margin-bottom: 20px;
    }
`

const AnimationButton = styled.button`
    width: 100%;
    padding: 15px 5px;
    cursor: pointer;
    color: #FFF;
    transition: all 0.5s;
    position: relative;
    background-color: transparent;
    border: none;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgba(255,255,255,0.6);
        transition: all 0.3s;
    }

    &:hover::before {
        opacity: 0 ;
        transform: scale(0.5,0.5);
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;
        transition: all 0.3s;
        border: 1px solid rgba(255,255,255,0.5);
        transform: scale(1.2,1.2);
    }

    &:hover::after {
        opacity: 1;
        transform: scale(1,1);
    }
`