import { useTranslation } from '@pancakeswap/localization'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Container from './Container'

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-bottom: 16px;
  padding-left:0px;
  padding-right:0px;
  @media screen and (max-width: 600px) {
      padding-left:10px;
      padding-right:10px;
      width: 100%;
      overflow-x:hidden;
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
}

const mystyle = {
  backgroundImage: `url("https://img.freepik.com/free-photo/underwater-adventure-blue-sea-life-reef-fish-generative-ai_188544-12760.jpg?w=1060&t=st=1685941191~exp=1685941791~hmac=2650cc56ecce50a01b9937906de2ac66114416012248699abdb3e51fdf11eca1")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const Page: React.FC<React.PropsWithChildren<PageProps>> = ({ children, symbol, ...props }) => {
  return (
    <>
      <div style={mystyle}>
        <PageMeta symbol={symbol} />
        <StyledPage {...props}>{children}</StyledPage>
      </div>
    </>
  )
}

export default Page
