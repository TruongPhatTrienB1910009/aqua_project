import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useCoreAquaDream } from 'hooks/useContract'
import { useCallback, useState } from 'react'
import { getAddress } from 'utils/addressHelpers'

export const useClaim = (chainId) => {
    const [requestedClaim, setRequestClaim] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
    const [isCloseClaim, setClose] = useState(false)
    const { t } = useTranslation()
    const marketplaceContract = useCoreAquaDream(getAddress(contract.coreAquaDream, chainId));
    const [pendingClaim, setPendingClaim] = useState(false)
    const handleClaim = useCallback(async () => {
        setPendingClaim(true)
        try {
            const tx = await callWithMarketGasPrice(marketplaceContract, 'claimETH');
            const receipt = await tx.wait()
            if (receipt.status) {
                toastSuccess(
                    t(`Successfully claim`),
                    <ToastDescriptionWithTx txHash={receipt.transactionHash} />
                )
                setClose(true)
                setRequestClaim(true)
            } else {
                // user rejected tx or didn't go thru
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                setRequestClaim(false)
            }
        } catch (e) {
            console.error(e)
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        } finally {
            setPendingClaim(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callWithMarketGasPrice, marketplaceContract, toastSuccess, t, toastError])


    return { handleClaim, requestedClaim, pendingClaim, isCloseClaim }
}
