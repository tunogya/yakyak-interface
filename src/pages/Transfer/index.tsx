import {Stack} from "@chakra-ui/react";
import {TabMenuItem} from "../../components/TabMenuItem";
import {useState} from "react";

export const Transfer = () => {
  const tabList = [
    {id: 0, label: "Pay", path: "/transfer/pay"},
    {id: 1, label: "Get Rewards", path: "/transfer/request"},
    {id: 2, label: "More", path: "/transfer/more"},
  ]
  const [activate, setActivate] = useState(0)

  return (
    <Stack w={"full"}>
      <Stack h={"60px"} bg={"white"} direction={"row"} justifyContent={"center"} alignItems={"center"}
             borderBottomWidth={"1px"} borderBottomColor={"divider"}>
        {
          tabList.map((tab) => (
            <TabMenuItem key={tab.id} label={tab.label} activated={activate === tab.id}
                         onClick={() => setActivate(tab.id)}/>
          ))
        }
      </Stack>
    </Stack>
  )
}

export default Transfer