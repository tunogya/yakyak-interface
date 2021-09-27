import {Trans} from "@lingui/macro";
import {
  Button,
  Modal,
  ModalBody, ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, Spacer, Stack, Text,
  useDisclosure
} from "@chakra-ui/react";
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {isMobile} from "react-device-detect";
import {SUPPORTED_WALLETS} from '../../constants/wallet'
import {injected, portis} from "../../connectors";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {AbstractConnector} from "@web3-react/abstract-connector";
import {useState} from "react";
import MetamaskIcon from '../../assets/images/metamask.png'
import styled from "styled-components";

const IconWrapper = styled.div<{ size?: number | null }>`
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({size}) => (size ? size + 'px' : '24px')};
    width: ${({size}) => (size ? size + 'px' : '24px')};
  }
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export const WalletModal = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {active, account, connector, activate, error} = useWeb3React()
  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  const [pendingError, setPendingError] = useState<boolean>()

  console.log(account)

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })

    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
    activate(connector, undefined, true).catch((error) => {
      if (error instanceof UnsupportedChainIdError) {
        activate(connector) // a little janky...can't use setError because the connector isn't set
      } else {
        setPendingError(true)
      }
    })
  }

  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      if (isMobile) {
        //disable portis on mobile for now
        if (option.connector === portis) {
          return null
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Button
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              link={option.href}
              isFullWidth={true}
              size={"lg"}
              icon={option.iconURL}
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector)
              }}>
              <Stack direction={"row"} w={"100%"} alignItems={"center"}>
                <Text>{option.name}</Text>
                <Spacer/>
                <IconWrapper>
                  <img src={option.iconURL} alt={'Icon'}/>
                </IconWrapper>
              </Stack>
            </Button>
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Button
                id={`connect-${key}`}
                key={key}
                isFullWidth={true}
                header={<Trans>Install Metamask</Trans>}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
                size={"lg"}
              >
                <Stack direction={"row"} w={"100%"} alignItems={"center"}>
                  <Text>{option.name}</Text>
                  <Spacer/>
                  <IconWrapper>
                    <img src={option.iconURL} alt={'Icon'}/>
                  </IconWrapper>
                </Stack>
              </Button>
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Button
            isFullWidth={true}
            size={"lg"}
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            link={option.href}
            header={option.name}
            icon={option.iconURL}
          >
            <Stack direction={"row"} w={"100%"} alignItems={"center"}>
              <Text>{option.name}</Text>
              <Spacer/>
              <IconWrapper>
                <img src={option.iconURL} alt={'Icon'}/>
              </IconWrapper>
            </Stack>
          </Button>
        )
      )
    })
  }

  return (
    <>
      <Button size={"md"} onClick={onOpen}><Trans>Connect Wallet</Trans></Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader><Trans>Connect wallet</Trans></ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Stack pb={4}>
              {getOptions()}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WalletModal