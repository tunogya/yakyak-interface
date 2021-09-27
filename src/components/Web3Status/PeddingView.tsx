import { AbstractConnector } from "@web3-react/abstract-connector"
import { SUPPORTED_WALLETS } from "../../constants/wallet"
import { injected } from "../../connectors"
import { Trans } from "@lingui/macro"
import { Button, Spacer, Stack, Text } from "@chakra-ui/react"

export default function PendingView({
  connector,
  error = false,
  setPendingError,
  tryActivation,
}: {
  connector?: AbstractConnector
  error?: boolean
  setPendingError: (error: boolean) => void
  tryActivation: (connector: AbstractConnector) => void
}) {
  const isMetamask = window?.ethereum?.isMetaMask

  return (
    <Stack spacing={8} pb={4}>
      {error ? (
        <Stack direction={"row"} alignItems={"center"}>
          <Text>
            <Trans>Error connecting</Trans>
          </Text>
          <Spacer />
          <Button
            onClick={() => {
              setPendingError(false)
              connector && tryActivation(connector)
            }}
            size={"sm"}
          >
            <Trans>Try Again</Trans>
          </Button>
        </Stack>
      ) : (
        <Text>
          <Trans>Initializing...</Trans>
        </Text>
      )}
      {Object.keys(SUPPORTED_WALLETS).map(key => {
        const option = SUPPORTED_WALLETS[key]
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== "MetaMask") {
              return null
            }
            if (!isMetamask && option.name === "MetaMask") {
              return null
            }
          }
          return (
            <Button isFullWidth={true} size={"lg"} id={`connect-${key}`} key={key} icon={option.iconURL} disabled>
              <Stack direction={"row"} w={"100%"} alignItems={"center"}>
                <Text color={option.connector === connector ? option.color : "black"}>{option.name}</Text>
                <Spacer />
              </Stack>
            </Button>
          )
        }
        return null
      })}
    </Stack>
  )
}
