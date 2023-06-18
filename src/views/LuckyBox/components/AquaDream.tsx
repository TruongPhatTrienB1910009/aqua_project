import React, { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled, { css, keyframes } from 'styled-components'
import { Text, Flex, Button } from '@pancakeswap/uikit'
import { Loading } from 'views/Inventory/components/ListShoes'
import CardAquaDream from './CardAquaDream'

import { BalanceOf, TotalSupply, TokenOfOwnerByIndex, IsClaimed } from '../hook/aquadream/readContract'
import { useMintNft } from '../hook/aquadream/useMintNft'
import { GetDataNFT } from '../hook/aquadream/fetchData'
import { useClaim } from '../hook/aquadream/useClaim'

interface Props {
  filter?: number
  query?: string
}

const AquaDream: React.FC<Props> = () => {
  const { account, chainId } = useActiveWeb3React()
  const [refresh, setRefresh] = useState(0)
  function onRefresh(newValue: number) {
    setRefresh(newValue)
  }

  const { nftBalance } = BalanceOf(account, chainId)
  const { totalSupply } = TotalSupply(chainId)
  const { tokenOfOwnerByIndex } = TokenOfOwnerByIndex(account, chainId)
  const { handleMint, pendingMint } = useMintNft(chainId, onRefresh)
  const { handleClaim } = useClaim(chainId)
  const { dataNFT } = GetDataNFT(tokenOfOwnerByIndex)
  const { isClaimed } = IsClaimed(chainId, tokenOfOwnerByIndex)

  const handleMintNFT = () => {
    handleMint()
  }

  const handleClaimNFT = () => {
    handleClaim()
  }
  // hello
  useEffect(() => {
    console.log('nftBalance', nftBalance)
    console.log('totalSupply', totalSupply)
    console.log('tokenOfOwnerByIndex', tokenOfOwnerByIndex)
    console.log('isClaimed', isClaimed)
    console.log('account', account)
    if (tokenOfOwnerByIndex >= 0) {
      console.log('data', dataNFT)
    }
  }, [nftBalance, totalSupply, tokenOfOwnerByIndex, dataNFT, isClaimed, account])

  return (
    <CsFlexContainer width="100%" flexDirection="column" mt="8rem" height="auto" minHeight="80vh">
      {account != null && dataNFT != null ? (
        <CsFlex>
          <CardAquaDream
            nftImage={dataNFT.image}
            nftPrice={20}
            nftType={dataNFT.nftType}
            nftName={dataNFT.name}
            nftBalance={nftBalance}
            ID={tokenOfOwnerByIndex}
            onClaimNFT={handleClaimNFT}
            isClaimed={isClaimed}
            acc={account}
          />
          <MainContent>
            <h1>Total: {totalSupply} minted</h1>
            <img src="/images/myimages/logo.png" alt="" />
            <p>Exploring the Deep Sea of BASE NFTs</p>

            <AnimationButton disabled>Minted</AnimationButton>
          </MainContent>
        </CsFlex>
      ) : (
        <CsFlex>
          <CardAquaDream
            nftImage="/images/cardSecret.jpg"
            nftName="Card AquaDream"
            acc={account}
          />
          <MainContent>
            <h1>Total: {totalSupply} minted</h1>
            <img src="/images/myimages/logo.png" alt="" />
            <p>Exploring the Deep Sea of BASE NFTs</p>
            <AnimationButton disabled>Connect wallet to mint</AnimationButton>
          </MainContent>
        </CsFlex>
      )}
    </CsFlexContainer>
  )
}

export default AquaDream

const CustomFlex = styled(Flex)`
  margin-bottom: 1.5rem;
  .pagination {
    display: flex;
    flex-direction: row;
    width: 500px;
    justify-content: space-around;
    align-items: center;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
    * {
      list-style-type: none;
    }
  }
  .page-link {
    background: ${({ theme }) => theme.colors.tertiary};
    padding: 12px;
    border-radius: 5px !important;
    border: none !important;
    color: ${({ theme }) => theme.colors.text};
    &:focus {
      box-shadow: none !important;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.backgroundTab};
    }
  }
  .page-item.disabled .page-link {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed !important;
    opacity: 0.7;
    pointer-events: none;
  }
  .page-item.active .page-link {
    background: ${({ theme }) => theme.colors.primaryBright};
    color: #fff;
  }
`
const CsFlex = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 30px;
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 80%;
    justify-content: space-evenly;
    column-gap: 0px;
    padding: 0px;
  }
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    column-gap: 0px;
    padding: 0px;
  }
  @media screen and (max-width: 600px) {
    justify-content: center;
    gap: 0px;
    padding: 0px 10px;
  }
`
const CsFlexContainer = styled(Flex)`
  alignItems: center;
  justify-content: space-between;
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    align-items: center;
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: auto;
  height: auto;
  background: transparent;
    // border: 7px solid #ccc;
    // box-shadow: 0 0 9px rgba(0, 0, 0, 3.3);
    // border-radius: 10px;
  padding: 20px;
  // right: 50px;
  // bottom: 0px;
  position: relative;
  color: #000000;
  h1 {
    font-size: 30px;
    color: #ffffff;
    position: relative;
  }

  img {
    max-width: 180px;
    height: 200px;
  }

  p {
    width: 100%;
    // height: 140px;
    left: 625px;
    top: 442px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    color: #ffffff;
    line-height: 60px;
    margin-bottom: 20px;
  }
`

const AnimationButton = styled.button`
  width: fit-content;
  padding: 15px 15px;
  cursor: pointer;
  color: #fff;
  transition: all 0.5s;
  // right: 260px;
  // bottom: 0px;
  // position: relative;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 42px;
  /* or 104% */

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: capitalize;
  box-shadow: 0px 9px 9px rgba(0, 0, 0, 5.25);
  border-radius: 15px;
  margin: 10px 0;
  color: #ffffff;
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
  border-radius: 20px;
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

  //   &:hover::before {
  //     opacity: 0;
  //     transform: scale(0.5, 0.5);
  //   }

  // &::after {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   z-index: 1;
  //   opacity: 0;
  //   transition: all 0.3s;
  //   border: 1px solid rgba(255, 255, 255, 0.5);
  //   transform: scale(1.2, 1.2);
  // }

  //   &:hover::after {
  //     opacity: 1;
  //     transform: scale(1, 1);
  //   }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      background: linear-gradient(101.61deg, #ffd9b7 -14.72%, #ff6543 66.97%);
      width: fit-content;
      right: 270px;
    `}
`
