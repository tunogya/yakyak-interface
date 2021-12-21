import React, {FC, useState} from "react";
import {Button, Code, Heading, NumberInput, NumberInputField, Stack, Text} from "@chakra-ui/react";
import {useYakYakBankContract, useYakYakRewardContract} from "../../hooks/useContract";
import {YAKYAK_BANK_ADDRESS, YAKYAK_REWARDS_ADDRESS} from "../../constants/addresses";
import {useActiveWeb3React} from "../../hooks/web3";
import {parseToBigNumber} from "../../utils/bignumberUtil";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/misc";

const Deposit = () => {
  const format = (val: string) => val + ' YakYak®'
  const parse = (val: string) => val.replace(/[a-zA-Z\s]+/g, '')
  const [approveStatus, setApproveStatus] = useState(IDLE)
  const [depositStatus, setDepositStatus] = useState(IDLE)
  const { chainId, library, account } = useActiveWeb3React()
  const yakYakRewards = useYakYakRewardContract(YAKYAK_REWARDS_ADDRESS[chainId ?? 1], true)
  const yakYakBank = useYakYakBankContract(YAKYAK_BANK_ADDRESS[chainId ?? 1], true)
  const [amount, setAmount] = useState('0')
  const [approveAmount, setApproveAmount] = useState('0')
  const [cheque, setCheque] = useState<{
    cheque: {[key: string]: string | number},
    r: string,
    s: string,
    v: number
  }>()
  const [verifyResult, setVerifyResult] = useState('')

  const handleApprove = async () => {
    if (!yakYakRewards || approveAmount === "0") { return }
    const amount = parseToBigNumber(approveAmount).shiftedBy(18).toFixed(0)
    try {
      setApproveStatus(PROCESSING)
      const tx = await yakYakRewards.approve(YAKYAK_BANK_ADDRESS[chainId ?? 1], amount)
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setApproveStatus(ERROR)
          setTimeout(()=>{
            setApproveStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setApproveStatus(SUCCESS)
          setTimeout(()=>{
            setApproveStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setApproveStatus(ERROR)
      setTimeout(()=>{
        setApproveStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  const handleSign = async () => {
    if (!chainId) return
    const message: {[key: string]: string | number} = {
      id: 1,
      amount: parseToBigNumber(amount).shiftedBy(18).toFixed(0),
    }
    const data = JSON.stringify({
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Cheque: [
          { name: "id", type: "uint256" },
          { name: "amount", type: "uint256" },
        ],
      },
      domain: {
        name: "YakYak Bank",
        version: "1",
        chainId: 4,
        verifyingContract: "0xBA29386D5cbCB8C047716ad29a7FF3BD282b166E",
      },
      primaryType: "Cheque",
      message: message
    })

    try {
      // @ts-ignore
      library.provider.sendAsync({
        method: "eth_signTypedData_v3",
        params: [account, data],
      }, function (error, response) {
        if (error) {
          return console.log(error);
        }
        const signature = response.result.substring(2);
        const r = "0x" + signature.substring(0, 64);
        const s = "0x" + signature.substring(64, 128);
        const v = parseInt(signature.substring(128, 130), 16);
        if (message) {
          setCheque({
            cheque: message,
            r: r,
            s: s,
            v: v,
          })
        }
      })
    }catch (e){
      console.log(e)
    }
  }

  const handleVerify = async () =>{
    if (!yakYakBank || !cheque) return
    try{
      const res = await yakYakBank.verify(cheque.cheque, cheque.r, cheque.s, cheque.v)
      setVerifyResult(res)
    }catch (e){
      console.log(e)
    }
  }

  const handleDeposit = async () => {
    if (!yakYakBank || approveAmount === "0") { return }
    const amount = parseToBigNumber(approveAmount).shiftedBy(18).toFixed(0)
    try {
      setDepositStatus(PROCESSING)
      const tx = await yakYakBank.deposit(amount)
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setDepositStatus(ERROR)
          break
        case 1:
          setDepositStatus(SUCCESS)
          break
      }
    } catch (e) {
      setDepositStatus(ERROR)
    } finally {
      setDepositStatus(IDLE)
    }
  }

  return (
    <Stack spacing={[2, 4, 4, 8]} w={"600px"}>
      <Stack spacing={[2, 4, 4, 8]}>
        <BankFormTitle id={"00"} title={"Deposit funds to the bank (Option)"}/>
        <NumberInput variant={"filled"} min={0}
                     onChange={(valueString) => setApproveAmount(parse(valueString))}
                     onFocus={(e) => {
                       e.target.setSelectionRange(0, approveAmount.length)
                     }}
                     value={format(approveAmount)}
        >
          <NumberInputField/>
        </NumberInput>
        <Stack direction={"row"}>
          <Button isFullWidth variant={"outline"} onClick={handleApprove} disabled={approveAmount === '0'}
                  isLoading={approveStatus === PROCESSING} loadingText={"Approving"}>
            Approve
          </Button>
          <Button isFullWidth onClick={handleDeposit} isLoading={depositStatus === PROCESSING}
                  disabled={approveAmount === '0'} loadingText={"Depositing"}>
            Deposit
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={[2, 4, 4, 8]}>
        <BankFormTitle id={"01"} title={"Set cheque amount"}/>
        <NumberInput variant={"filled"} min={0}
                     onFocus={(e) => {
                       e.target.setSelectionRange(0, amount.length)
                     }}
                     value={format(amount)}
                     onChange={(valueString) => setAmount(parse(valueString))}>
          <NumberInputField/>
        </NumberInput>
      </Stack>

      <Stack spacing={[2, 4, 4, 8]}>
        <BankFormTitle id={"02"} title={"Sign cheque"}/>
        <Button onClick={handleSign} disabled={amount === '0'}>
          Sign
        </Button>
      </Stack>

      {(cheque) && (
        <Stack p={[2 ,2, 4, 4]} bg={"blue.300"} borderRadius={"20px"} fontWeight={"bold"}>
          <Code children={JSON.stringify(cheque)} bg={"blue.300"}/>
        </Stack>
      )}

      <Button onClick={handleVerify}>
        Verify
      </Button>

      <Text>{verifyResult}</Text>
    </Stack>
  )
}

type BankFormTitleProps = {
  id?: string | number
  title: string
}

const BankFormTitle: FC<BankFormTitleProps> = ({...props}) => {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Heading fontSize={"xl"} color={"blue.500"}>{props.id}</Heading>
      <Heading fontSize={"xl"} color={"blue.700"}>{props.title}</Heading>
    </Stack>
  )
}

export default Deposit