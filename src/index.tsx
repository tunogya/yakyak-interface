import React, { StrictMode } from "react"
import ReactDOM from "react-dom"
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core"
import App from "./pages/App"
import { NetworkContextName } from "./constants/misc"
import { RecoilRoot } from "recoil"
import { HashRouter } from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"
import { LanguageProvider } from "./i18n"
import Blocklist from "./components/Blocklist"
import getLibrary from "./utils/getLibrary"
import "focus-visible/dist/focus-visible"
import { createGlobalStyle } from "styled-components"
import MovaviGrotesque from "./assets/font/movavi-grotesque.black.ttf"
import {isMobile} from "react-device-detect"
import ReactGA from "react-ga"
import {GoogleAnalytics} from "./components/analytics/GoogleAnalytics";

const GlobalStyle = createGlobalStyle`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
  @font-face {
    font-family: 'Movavi Grotesque';
    src: url(${MovaviGrotesque}) format('woff2');
  }
  body {
    background: #F5F7FA;
  }
`

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

const GOOGLE_ANALYTICS_ID: string | undefined = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
    gaOptions: {
      storage: 'none',
      storeGac: false,
    },
  })
  ReactGA.set({
    anonymizeIp: true,
    customBrowserType: !isMobile
      ? 'desktop'
      : 'web3' in window || 'ethereum' in window
        ? 'mobileWeb3'
        : 'mobileRegular',
  })
} else {
  ReactGA.initialize('test', { testMode: true, debug: true })
}

const Updaters = () => {
  return <></>
}

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <HashRouter>
        <ChakraProvider theme={theme}>
          <GlobalStyle />
          <LanguageProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
              <Web3ProviderNetwork getLibrary={getLibrary}>
                <Blocklist>
                  <Updaters />
                  <GoogleAnalytics />
                  <App />
                </Blocklist>
              </Web3ProviderNetwork>
            </Web3ReactProvider>
          </LanguageProvider>
        </ChakraProvider>
      </HashRouter>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
