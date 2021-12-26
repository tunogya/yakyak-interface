import {Stack} from "@chakra-ui/react";
import {MenuButtonWithIcon} from "../../components/MenuButtonWithIcon";
import {ArrowDownIcon, ArrowUpIcon, HamburgerIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";

export const Actions = () => {
  const navigate = useNavigate()

  return (
    <Stack direction={"row"} my={"36px"} justifyContent={"space-between"}>
      <MenuButtonWithIcon icon={<ArrowUpIcon/>} label={"Send"} variant={"solid"} onClick={()=> {
        navigate("/transfer/pay")
      }}/>
      <MenuButtonWithIcon icon={<ArrowDownIcon/>} label={"Request"} variant={"solid"} onClick={()=> {
        navigate("/transfer/request")
      }}/>
      <MenuButtonWithIcon icon={<HamburgerIcon/>} label={"More"} variant={"outline"} inverse={true} onClick={()=> {

      }}/>
    </Stack>
  )
}