import React, {useEffect} from "react"
import {Route, Routes, useLocation} from "react-router-dom"
import {Stack} from "@chakra-ui/react"
import Header from "../components/Header"
import Web3ReactManager from "../components/Web3ReactManager"
import Summary from "./Summary";
import Transfer from "./Transfer";
import Shopping from "./Shopping";
import Transactions from "./Transactions";
import ReactGA from "react-ga";

function App() {
  return (
    <Web3ReactManager>
      <Stack spacing={0} h={"full"}>
        <Stack position={"fixed"} w={"full"} zIndex={"docked"}>
          <Header/>
        </Stack>
        <Stack w={"full"}>
          <Content/>
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

const Content = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.pageview(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  return (
    <Stack alignItems={"center"} pt={"96px"}>
      <Routes>
        <Route path="/" element={<Summary/>}/>
        <Route path="/summary" element={<Summary/>}/>
        <Route path="/transfer" element={<Transfer/>}>
          <Route path=":action" element={<Transfer/>}/>
        </Route>
        <Route path="/shopping" element={<Shopping/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
        <Route
          path="*"
          element={
            <main style={{padding: "1rem"}}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Stack>
  )
}

export default App
