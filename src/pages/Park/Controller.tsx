import {Stack, Text} from "@chakra-ui/react";
import {FC, ReactElement, useState} from "react";
import Yaklon from "./Yaklon";
import {useNavigate, useParams} from "react-router-dom";

type ControllerProps = {
  tool?: ReactElement
}

export const Controller: FC<ControllerProps> = ({...props}) => {
  const [hiddenMenu, setHiddenMenu] = useState(true)
  const navigator = useNavigate()
  const params = useParams()
  const menu = [
    {label: 'Yaklon', link: 'yaklon'},
    {label: 'Adopt', link: 'adopt'},
  ]

  return (
    <Stack h={"60px"} bg={"white"} alignItems={"center"} justifyContent={"center"} w={"full"}
           borderBottomWidth={"1px"} borderBottomColor={"divider"}>
      <Stack w={"full"} maxW={"1024px"} direction={"row"} alignItems={"center"} spacing={"60px"} fontSize={"14px"}>
        <Text fontWeight={"600"} color={"primary"} onMouseOver={() => setHiddenMenu(false)} cursor={"pointer"}
              >{params?.action?.toUpperCase()}</Text>
        {props.tool}
      </Stack>
      <Stack w={"full"} maxW={"1064px"} position={"absolute"} top={"150px"} hidden={hiddenMenu}>
        <Stack bg={"white"} w={"240px"} p={"20px"} boxShadow={"xs"} borderRadius={8} fontSize={"14px"} onMouseLeave={()=> setHiddenMenu(true)}>
          { menu.map((item)=> (
            <Text fontWeight={"600"} cursor={"pointer"} _hover={{ color: "primary" }}  onClick={()=>{
              navigator(`/shopping/${item.link}`)
            }}>{item.label}</Text>
          )) }
        </Stack>
      </Stack>
    </Stack>
  )
}