import {Button, FormControl, FormHelperText, FormLabel, Input, Spacer, Stack} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";

export const Wallet = () => {
  return (
    <Stack w={"600px"} h={"600px"} p={6} borderRadius={"xl"} spacing={6}>
      <FormControl id="To">
        <FormLabel>From</FormLabel>
        <Input variant="filled" disabled/>
      </FormControl>
      <FormControl id="To">
        <FormLabel>To</FormLabel>
        <Input variant="filled"/>
      </FormControl>
      <FormControl id="Amount">
        <FormLabel>Amount</FormLabel>
        <Input type={"number"} variant="filled"/>
        <FormHelperText>My balance: 0</FormHelperText>
      </FormControl>
      <Spacer/>
      <Button colorScheme={"blue"}><Trans>Transfer</Trans></Button>
    </Stack>
  )
}

export default Wallet