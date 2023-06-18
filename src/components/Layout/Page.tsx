import { useTranslation } from '@pancakeswap/localization'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Container from './Container'

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-bottom: 16px;
  padding-left: 0px;
  padding-right: 0px;
  @media screen and (max-width: 600px) {
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    overflow-x: hidden;
  }
`

export const PageMeta: React.FC<React.PropsWithChildren<{ symbol?: string }>> = ({ symbol }) => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { pathname } = useRouter()
  const pageMeta = getCustomMeta(pathname, t, locale) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  let pageTitle = title
  if (symbol) {
    pageTitle = [symbol, title].join(' - ')
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol?: string
  url?: string
}

const mycss = `.bg {
  position: relative;
  background-image: url('https://i.ibb.co/YdhFss0/background.png');
  background-size: cover;
}
.bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Change the color and opacity as needed */
}`

const Page: React.FC<React.PropsWithChildren<PageProps>> = ({ children, symbol, ...props }) => {
  return (
    <>
      <style>{mycss}</style>
      <div className="bg">
        <PageMeta symbol={symbol} />
        <StyledPage {...props}>{children}</StyledPage>
      </div>
    </>
  )
}

export default Page
