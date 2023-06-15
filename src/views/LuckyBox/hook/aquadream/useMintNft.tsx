import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useCoreAquaDream } from 'hooks/useContract'
import { useCallback, useEffect, useState } from 'react'
import { getAddress } from 'utils/addressHelpers'

export const useMintNft = (chainId: number, onRefresh) => {
    const [requestedBuy, setRequestBuy] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
    const [isCloseBuy, setClose] = useState(false)
    const { t } = useTranslation()
    const marketplaceContract = useCoreAquaDream(getAddress(contract.coreAquaDream, chainId));
    const [pendingBuy, setPendingBuy] = useState(false)
    const handleMint = useCallback(async () => {
        setPendingBuy(true)
        try {
            const tx = await callWithMarketGasPrice(marketplaceContract, 'mintNFT')
            const receipt = await tx.wait()
            if (receipt.status) {
                toastSuccess(
                    t(`Successfully mint`),
                    <ToastDescriptionWithTx txHash={receipt.transactionHash} />
                )
                setClose(true)
                setRequestBuy(true)
                onRefresh(Date.now())
            } else {
                // user rejected tx or didn't go thru
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                setRequestBuy(false)
            }
        } catch (e) {
            console.error(e)
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        } finally {
            setPendingBuy(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callWithMarketGasPrice, marketplaceContract, toastSuccess, t, toastError])


    return { handleMint, requestedBuy, pendingBuy, isCloseBuy }
}
