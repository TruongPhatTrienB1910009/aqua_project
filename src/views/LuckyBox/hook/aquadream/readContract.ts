/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-await-in-loop */
import { getAddress } from 'utils/addressHelpers'
import contracts from 'config/constants/contracts'
import multicall from 'utils/multicall'
import aquadream from 'config/abi/aquadream.json'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'

export const BalanceOf = (account: string, chainId: number) => {
  const [nftBalance, setNftBalance] = useState(0)
  useEffect(() => {
    const getBalanceOf = async () => {
      try {
        const callBoxId = [
          {
            address: getAddress(contracts.coreAquaDream, chainId),
            name: 'balanceOf',
            params: [account],
          },
        ]
        const idRunBox = await multicall(aquadream, callBoxId, chainId)
        const index = new BigNumber(idRunBox.toString()).toNumber()
        setNftBalance(index)
      } catch (e) {
        console.log(e)
      }
    }

    getBalanceOf()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId])
  return { nftBalance }
}

export const TotalSupply = (chainId: number) => {
  const [totalSupply, setTotalSupply] = useState(0)
  useEffect(() => {
    const getTotalSupply = async () => {
      try {
        const callBoxId = [
          {
            address: getAddress(contracts.coreAquaDream, chainId),
            name: 'totalSupply',
          },
        ]
        const idRunBox = await multicall(aquadream, callBoxId, chainId)
        const index = new BigNumber(idRunBox.toString()).toNumber()
        setTotalSupply(index)
      } catch (e) {
        console.log(e)
      }
    }

    getTotalSupply()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])
  return { totalSupply }
}

export const TokenOfOwnerByIndex = (account, chainId: number) => {
  const [tokenOfOwnerByIndex, settokenOfOwnerByIndex] = useState(0)
  useEffect(() => {
    const gettokenOfOwnerByIndex = async () => {
      try {
        const callBoxId = [
          {
            address: getAddress(contracts.coreAquaDream, chainId),
            name: 'tokenOfOwnerByIndex',
            params: [account, 0],
          },
        ]
        const idRunBox = await multicall(aquadream, callBoxId, chainId)
        const index = new BigNumber(idRunBox.toString()).toNumber()
        settokenOfOwnerByIndex(index)
      } catch (e) {
        console.log(e)
      }
    }

    gettokenOfOwnerByIndex()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId])
  return { tokenOfOwnerByIndex }
}

export const IsClaimed = (chainId: number, ID: any) => {
  const [isClaimed, setIsClaimed] = useState(false)
  useEffect(() => {
    const getIsClaimed = async () => {
      try {
        const callBoxId = [
          {
            address: getAddress(contracts.coreAquaDream, chainId),
            name: 'isClaimed',
            params: [ID],
          },
        ]
        const idRunBox = await multicall(aquadream, callBoxId, chainId)
        setIsClaimed(idRunBox[0][0])
      } catch (e) {
        console.log(e)
      }
    }

    getIsClaimed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ID, chainId])
  return { isClaimed }
}
