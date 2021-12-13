import { injected } from "../../connectors"
import { Trans } from "@lingui/macro"
import { SUPPORTED_WALLETS } from "../../constants/wallet"
import {Button, IconButton, Link, Spacer, Stack, Text, useClipboard} from "@chakra-ui/react"
import { useActiveWeb3React } from "../../hooks/web3"
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink"
import { shortenAddress } from "../../utils"
import { CopyIcon } from "@chakra-ui/icons"

interface AccountDetailsProps {
  openOptions: () => void
}

const AccountDetails = ({ openOptions }: AccountDetailsProps) => {
  const { chainId, account, connector } = useActiveWeb3React()
  const { onCopy } = useClipboard(account ?? "")

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
      <Stack>
        <Trans>Connected with {name}</Trans>
      </Stack>
    )
  }

  return (
    <Stack spacing={"20px"}>
      {formatConnectorName()}
      {connector !== injected  && (
        <Button
          onClick={() => {
            ;(connector as any).close()
          }}
        >
          <Trans>Disconnect</Trans>
        </Button>
      )}
      <Stack direction={"row"} alignItems={"center"} justifyItems={"center"}>
        <Text>{account && shortenAddress(account)}</Text>
        <IconButton aria-label={"copy"} icon={<CopyIcon />} onClick={onCopy} variant={"ghost"} />
        <Spacer/>
        {chainId && account && (
          <Link isExternal href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}>View on Explorer</Link>
        )}
      </Stack>
      <Button onClick={openOptions}>
        <Trans>Change</Trans>
      </Button>

    </Stack>
  )
}

export default AccountDetails
