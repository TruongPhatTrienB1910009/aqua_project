import { ChainId } from '@pancakeswap/sdk'
// import MyBalancePage from './flyingdoge'
import LuckyBox from 'views/LuckyBox'
import { useRouter } from 'next/router'



const IndexPage = () => {
  // return <MyBalancePage />
  const router = useRouter()
  return (
    <LuckyBox activeIndex={router?.query?.tabactive?.toString()} />
  )
}
IndexPage.chains = [ChainId.CORE]

export default IndexPage
