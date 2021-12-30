import {YAKYAK_BANK_ADDRESS} from "../constants/addresses";
import {parseToBigNumber} from "../utils/bignumberUtil";
import {useActiveWeb3React} from "./web3";
import {atom, useRecoilState} from "recoil";

type Cheque = {
  id: number,
  amount: string,
  sender: string,
  signature: string,
}

const defaultChequeList: Cheque[] = []

export const chequeListAtom = atom({
  key: "cheque::list",
  default: defaultChequeList,
})

export const useCheque = () =>{
  const { chainId, library, account } = useActiveWeb3React()
  const [chequeList, setChequeList] = useRecoilState(chequeListAtom)

  const sign = (amount: string) => {
    if (!chainId || !account) return 'NaN'
    const id = new Date().getTime()
    const data = JSON.stringify({
      types: {
        EIP712Domain: [
          {name: "name", type: "string"},
          {name: "version", type: "string"},
          {name: "chainId", type: "uint256"},
          {name: "verifyingContract", type: "address"},
        ],
        cheque: [
          {name: "sender", type: "address"},
          {name: "id", type: "uint256"},
          {name: "amount", type: "uint256"},
        ],
      },
      domain: {
        name: "YakYakBank",
        version: "1",
        chainId: chainId,
        verifyingContract: YAKYAK_BANK_ADDRESS[chainId],
      },
      primaryType: "cheque",
      message: {
        sender: account,
        id: id,
        amount: parseToBigNumber(amount).shiftedBy(18).toFixed(0),
      },
    })
    try {
      // @ts-ignore
      library.provider.sendAsync(
        {
          method: "eth_signTypedData_v3",
          params: [account, data],
        },
        async function (error, response) {
          if (error) {
            return console.log(error)
          }
          const signature = response.result
          const cheque = {
            id: id,
            amount: parseToBigNumber(amount).shiftedBy(18).toFixed(0),
            sender: account,
            signature: signature,
          }
          setChequeList([...chequeList, cheque])
        }
      )
    } catch (e) {
      console.log(e)
    }
  }

  return {
    sign,
    chequeList,
  }
}