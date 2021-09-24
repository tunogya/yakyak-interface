import {Button, FormControl, FormHelperText, FormLabel, Input, Spacer, Stack} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";

export const Wallet = () => {
  return (
    <Stack w={"600px"} h={"600px"} p={6} borderRadius={"xl"} spacing={6}>
      <FormControl id="To">
        <FormLabel><Trans>From</Trans></FormLabel>
        <Input variant="filled" disabled/>
      </FormControl>
      <FormControl id="To">
        <FormLabel><Trans>To</Trans></FormLabel>
        <Input variant="filled"/>
      </FormControl>
      <FormControl id="Amount">
        <FormLabel><Trans>Amount</Trans></FormLabel>
        <Input type={"number"} variant="filled"/>
        <FormHelperText><Trans>My balance: </Trans>0</FormHelperText>
      </FormControl>
      <Spacer/>
      <Button colorScheme={"blue"}><Trans>Transfer</Trans></Button>
    </Stack>
  )
}

export default Wallet