import {
  Flex,
  EfficiencyIcon,
  LuckIcon,
  DurabilityIcon,
  HydroIcon,
  RunningIcon,
  StarIcon,
  CupIcon,
  SturdanceIcon,
  ProgressShoes,
  Text,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import React, { useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { renderBGCard } from 'utils/renderBGCard'

interface PropsCard {
  ID?: number
  nftName?: string
  nftImage?: string
  nftPrice?: any
  nftDesc?: any
  nftType?: string
  onClaimNFT?: any
  balanceOfToken?: number
  isClaimed?: any
  nftBalance?: any
  acc?: any
}

const CardAquaDream: React.FC<PropsCard> = ({
  ID,
  nftName,
  nftImage,
  nftType,
  nftPrice,
  nftDesc,
  onClaimNFT,
  balanceOfToken,
  isClaimed,
  nftBalance,
  acc,
}) => {
  console.log('isclamied', isClaimed, Number(nftType), nftBalance, acc)
  return (
    <>
      <Container>
        {nftBalance === 1 && acc != null && Number(nftType) !== 0 ? (
          <CustomCard>
            <ImgShoes src={nftImage} alt="Image Box" />
            <CustomText>{nftName}</CustomText>
            {isClaimed === false ? (
              <Button onClick={onClaimNFT}>Claim {nftPrice} USDT</Button>
            ) : (
              <AnimationButton disabled>Claimed</AnimationButton>
            )}
          </CustomCard>
        ) : (
          <CustomCard>
            <ImgShoes src="/images/cardSecret.jpg" alt="Image Box" />
            <CustomText>Card AquaDream</CustomText>
            {/* <AnimationButton disabled>Claimed</AnimationButton> */}
          </CustomCard>
        )}
      </Container>
    </>
  )
}

export default CardAquaDream

const Container = styled.div<{ isHaving?: boolean; background?: string }>`
  width: 360px;
  min-height: 420px;
  overflow: hidden;
  //   border: 7px solid #ccc;
  align-items: center;
  box-shadow: 0 0 9px rgba(0, 0, 0, 3.3);
  border-radius: 50px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
  }

  background: linear-gradient(180deg, #000b0e -18.24%, rgba(26, 112, 138, 0) 153.53%);
  background-image: ${(props) => props.background};
`

const CustomCard = styled.div<{ background?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  border-radius: 8px;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-bottom: 20px;
`
const ImgShoes = styled.img`
  width: 100%;
  height: 380px;
  // border-bottom: 1px solid #ccc;
`
const CustomText = styled(Text)`
  color: #fff;
  display: flex;
  align-item: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
`
const ContainerRow = styled.div`
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 15px;
`
const ContainerProgress = styled.div`
  width: 100%;
`
const ContainerTags = styled(Flex)<{ background?: string }>`
  border-radius: 6px;
  width: 100%;
  height: auto;
  justify-content: start;
  align-items: center;
  margin-bottom: 10px;
  ${Text} {
    font-size: 16px;
    font-weight: bold;
  }
`

const Button = styled.button`
  width: 50%;
  position: relative;
  padding: 12px;
  background: linear-gradient(
    191.32deg,
    #00121d -118.59%,
    #3da1a6 15.64%,
    #dacee1 56.18%,
    #5d6aaa 81.36%,
    #0d2986 109.76%,
    #481cbb 131.68%,
    #142d8e 131.68%
  );
  border-radius: 20.5692px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ffead2;
    color: #8294c4;
  }
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 42px;
  /* or 104% */

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: capitalize;

  color: #ffffff;

  border: 1px solid #000000;
`

const AnimationButton = styled.button`
  width: 200px;
  padding: 15px 5px;
  margin-top: 0px;
  cursor: pointer;
  color: #fff;
  transition: all 0.5s;
  position: relative;
  background-color: transparent;
  border: none;
  //   &::before {
  //     content: '';
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //     z-index: 1;
  //     background-color: rgba(255, 255, 255, 0.6);
  //     transition: all 0.3s;
  //   }

  &:hover::before {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  box-shadow: 0px 9px 9px rgba(0, 0, 0, 5.25);
  border-radius: 15px;

  //   &::after {
  //     content: '';
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //     z-index: 1;
  //     opacity: 0;
  //     transition: all 0.3s;
  //     border: 1px solid rgba(255, 255, 255, 0.5);
  //     transform: scale(1.2, 1.2);
  //   }

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 42px;
  /* or 104% */

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: capitalize;

  &:hover::after {
    opacity: 1;
    transform: scale(1, 1);
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      border-radius: 20.5692px;
      background: linear-gradient(101.61deg, #ffd9b7 -14.72%, #ff6543 66.97%);
      width: 100px;
    `}
`
