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
    <CsFlexContainer width="100%" flexDirection="column" mt="6rem" height="auto" minHeight="50vh">
      {account != null ? (
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
          {nftBalance === 0 ? (
            <MainContent>
              <h1>Total: {totalSupply} minted</h1>
              <img src="/images/help.png" alt="" />
              <p>Exploring the Deep Sea of BASE NFTs</p>
              {pendingMint ? <Loading /> : <AnimationButton onClick={handleMintNFT}>Mint NFT</AnimationButton>}
            </MainContent>
          ) : (
            <MainContent>
              <h1>Total: {totalSupply} minted</h1>
              <img src="/images/help.png" alt="" />
              <p>Exploring the Deep Sea of BASE NFTs</p>
              <AnimationButton disabled>Minted</AnimationButton>
            </MainContent>
          )}
        </CsFlex>
      ) : (
        <CsFlex>
          <CardAquaDream
            nftImage="/images/cardSecret.jpg"
            nftName="Card AquaDream"
            // nftBalance={nftBalance}
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
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    align-items: center;
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  height: 380px;
  background: transparent;
  //   border: 7px solid #ccc;
  box-shadow: 0 0 9px rgba(0, 0, 0, 3.3);
  border-radius: 10px;
  padding: 20px;
  color: #000000;
  h1 {
    font-size: 24px;
    color: #000000;
  }

  img {
    max-width: 180px;
    height: 200px;
  }

  p {
    width: 644px;
    height: 140px;
    left: 625px;
    top: 442px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 60px;
    line-height: 70px;
  }
`

const AnimationButton = styled.button`
  width: 100%;
  padding: 15px 5px;
  cursor: pointer;
  color: #fff;
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
    background-color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s;
  }

  &:hover::before {
    opacity: 0;
    transform: scale(0.5, 0.5);
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
    border: 1px solid rgba(255, 255, 255, 0.5);
    transform: scale(1.2, 1.2);
  }

  &:hover::after {
    opacity: 1;
    transform: scale(1, 1);
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`
