import {HStack, Input, VStack, Text, Button} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useSumContract} from "../../hooks/useContract";
import { ethers } from "ethers"

export const Swap = () => {
  const [curVal, setCurVal] = useState(0)
  const [testVal, setTestVal] = useState("")
  const [a, setA] = useState("0")
  const [b, setB] = useState("0")
  const useSum = useSumContract("0x0a0c5dd69d2658fb0da4a180e24e190ceaf6b5e2")

  useEffect(() => {
    if (ethers.utils.parseEther(a || "0").lt(0) ||ethers.utils.parseEther(b || "0").lt(0)) {setTestVal("0"); return}
    useSum?.callStatic.quoteExactInput(ethers.utils.parseEther(a || "0"), ethers.utils.parseEther(b || "0")).then(res => {
      setTestVal(ethers.utils.formatEther(res))
    })
  }, [a, b, setTestVal])

  return (
    <VStack alignItems={"flex-start"} w="400px" spacing={8}>
      <Text>当前合约值:{curVal}。</Text>
      <VStack w={"100%"}>
        <HStack w="100%">
          <Text>A:</Text>
          <Input type="number" onChange={e => setA(e.target.value)}/>
        </HStack>
        <HStack w="100%">
          <Text>B:</Text>
          <Input type="number" onChange={e => setB(e.target.value)}/>
        </HStack>
      </VStack>
      <HStack w={"100%"}>
        <Button isFullWidth>提交区块</Button>
      </HStack>
      <Text>预计合约值增加 {testVal}</Text>
    </VStack>
  )
}

export default Swap
