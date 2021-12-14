import { injected } from "../../connectors"
import { Trans } from "@lingui/macro"
import { SUPPORTED_WALLETS } from "../../constants/wallet"
import { Button, Stack, Text } from "@chakra-ui/react"
import { useActiveWeb3React } from "../../hooks/web3"

interface AccountDetailsProps {
  openOptions: () => void
}

const AccountDetails = ({ openOptions }: AccountDetailsProps) => {
  const { connector } = useActiveWeb3React()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        k =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === "METAMASK"))
      )
      .map(k => SUPPORTED_WALLETS[k].name)[0]
    return (
      <Stack direction={"row"}>
        <Text>
          <Trans>Connected with</Trans>
        </Text>
        <Text fontWeight={"bold"}>
          <Trans>{name}</Trans>
        </Text>
      </Stack>
    )
  }

  return (
    <Stack spacing={"20px"}>
      {formatConnectorName()}
      <Stack direction={"row"} spacing={"20px"}>
        {connector !== injected && (
          <Button
            isFullWidth
            variant={"ghost"}
            onClick={() => {
              ;(connector as any).close()
            }}
          >
            <Trans>Disconnect</Trans>
          </Button>
        )}
        <Button onClick={openOptions} isFullWidth variant={"outline"}>
          <Trans>Change</Trans>
        </Button>
      </Stack>
    </Stack>
  )
}

export default AccountDetails
