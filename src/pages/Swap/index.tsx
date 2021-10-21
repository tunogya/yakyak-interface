import {HStack, Input, VStack, Text, Button} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useSumContract} from "../../hooks/useContract";

export const Swap = () => {
  const [curVal, setCurVal] = useState(0)
  const [testVal, setTestVal] = useState(0)
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const useSum = useSumContract("0x0a0c5dd69d2658fb0da4a180e24e190ceaf6b5e2")

  useEffect(() => {
    if (Number(a) < 0 || Number(b) < 0) {setTestVal(0); return}
    useSum?.callStatic.quoteExactInput(Number(a), Number(b)).then(res => {
      setTestVal(res.toString())
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
