import {Stack} from "@chakra-ui/react";
import {Hello} from "./Hello";
import {Actions} from "./Actions";
import {SendAgain} from "./SendAgain";
import {RecentActivity} from "./RecentActivity";

export const Summary = () => {
  return (
    <Stack direction={"row"} spacing={0} w={"full"} maxW={"1024px"}>
      <Stack flex={"0 0 60%"} maxW={"60%"} px={"12px"}>
        <Hello/>
      </Stack>
      <Stack flex={"0 0 40%"} maxW={"40%"} px={"12px"}>
        <Actions/>
        <SendAgain/>
        <RecentActivity/>
      </Stack>
    </Stack>
  )
}

export default Summary