import { AbstractConnector } from "@web3-react/abstract-connector"
import { SUPPORTED_WALLETS } from "../../constants/wallet"
import { injected } from "../../connectors"
import { Trans } from "@lingui/macro"
import { Button, Spacer, Stack, Text } from "@chakra-ui/react"
import { RepeatIcon } from "@chakra-ui/icons"
import styled from "styled-components"

const IconWrapper = styled.div<{ size?: number | null }>`
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + "px" : "24px")};
    width: ${({ size }) => (size ? size + "px" : "24px")};
  }
`

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
        <Text>
          <Trans>Error connecting</Trans>
        </Text>
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
            <Button
              isFullWidth={true}
              size={"lg"}
              id={`connect-${key}`}
              key={key}
              // icon={option.iconURL}
              disabled={!error}
              onClick={() => {
                setPendingError(false)
                connector && tryActivation(connector)
              }}
            >
              <Stack direction={"row"} w={"100%"} alignItems={"center"}>
                {error && <RepeatIcon color={option.color} />}
                <Text color={option.color}>{option.name}</Text>
                <Spacer />
                <IconWrapper>
                  <img src={option.iconURL} alt={"Icon"} />
                </IconWrapper>
              </Stack>
            </Button>
          )
        }
        return null
      })}
    </Stack>
  )
}
