import React from "react"
import {Route, Routes} from "react-router-dom"
import {Stack} from "@chakra-ui/react"
import Header from "../components/Header"

function App() {
  return (
    <Stack spacing={0} h={"100vh"} bg={"primary"} color={"white"}>
      <Stack position={"fixed"} w={"full"} zIndex={"docked"}>
        <Header/>
      </Stack>
      <Stack w={"full"}>
        <Content/>
      </Stack>
    </Stack>
  )
}

const Content = () => {
  return (
    <Stack alignItems={"center"} pt={"96px"}>
      <Routes>
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
