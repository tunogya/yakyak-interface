import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Stack } from '@chakra-ui/react'
import Header from '../components/Header'

function App() {
  return (
    <Stack spacing={0}>
      <Stack background={'gray.200'} position={'fixed'} width={'100%'}>
        <Header />
      </Stack>
      <Stack p={'120px 16px 0 16px'} alignItems={'center'}>
        <Switch>
          <Route exact strict path="/vote" />
          <Route />
        </Switch>
      </Stack>
    </Stack>
  )
}

export default App
