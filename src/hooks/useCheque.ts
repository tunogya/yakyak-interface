import {YAKYAK_BANK_ADDRESS} from "../constants/addresses";
import {parseToBigNumber} from "../utils/bignumberUtil";
import {useActiveWeb3React} from "./web3";

export const useCheque = () =>{
  const { chainId, library, account } = useActiveWeb3React()

  const sign = (amount: string) => {
    if (!chainId) return
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
          const signature = response.result.substring(2)
          const r = "0x" + signature.substring(0, 64)
          const s = "0x" + signature.substring(64, 128)
          const v = parseInt(signature.substring(128, 130), 16)
          return {
            r, s, v, signature
          }
        }
      )
    } catch (e) {
      console.log(e)
    }
  }

  return {
    sign
  }
}