import {useNavigate, useParams} from "react-router-dom";
import Yaklon from "./Yaklon";
import Adopt from "./Adopt";
import {useEffect} from "react";
import {Stack} from "@chakra-ui/react";

export const Park = () => {
  const params = useParams()
  const navigator = useNavigate()

  useEffect(() => {
    if (!params?.action) {
      navigator("/shopping/yaklon")
    }
  }, [navigator, params.action])


  return (
    <Stack w={"full"}>
      <Stack alignItems={"center"}>
        { params?.action === 'yaklon' && (
          <Yaklon/>
        ) }
        {params?.action === 'adopt' && (
          <Adopt/>
        )}
      </Stack>
    </Stack>
  )
}

export default Park