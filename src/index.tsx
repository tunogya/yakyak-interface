import React, {StrictMode} from "react"
import ReactDOM from "react-dom"
import {createWeb3ReactRoot, Web3ReactProvider} from "@web3-react/core"
import App from "./pages/App"
import {NetworkContextName} from "./constants/misc"
import {RecoilRoot} from "recoil"
import {HashRouter} from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
import {ChakraProvider} from "@chakra-ui/react"
import theme from "./theme"
import {LanguageProvider} from "./i18n"
import Blocklist from "./components/Blocklist"
import getLibrary from "./utils/getLibrary"
import "focus-visible/dist/focus-visible"
import {createGlobalStyle} from "styled-components"
import MovaviGrotesque from "./assets/font/movavi-grotesque.black.ttf"
import Web3ReactManager from "./components/Web3ReactManager";

const GlobalStyle = createGlobalStyle`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }

  @font-face {
    font-family: 'Movavi Grotesque';
    src: url(${MovaviGrotesque}) format('woff2');
  }
`

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

const Updaters = () => {
  return <></>
}

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <HashRouter>
        <ChakraProvider theme={theme}>
          <GlobalStyle/>
          <LanguageProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
              <Web3ProviderNetwork getLibrary={getLibrary}>
                <Web3ReactManager>
                  <Blocklist>
                    <Updaters/>
                    <App/>
                  </Blocklist>
                </Web3ReactManager>
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
