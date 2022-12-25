import React from 'react'
import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react'
import { useCoinbaseWallet, useMetamask } from '@thirdweb-dev/react'

type LoginModalProps = {
  isOpen: boolean
  onClose: () => void
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const connectWithMetamask = useMetamask()
  const connectWithCoinbase = useCoinbaseWallet()
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={["xs", "sm", "md", "lg"]}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize={["md", "lg", "xl", "2xl"]}>Entrar</Heading>
        </ModalHeader>

        <ModalCloseButton fontSize={["sx", "sx", "sm", "md"]}/>

        <ModalBody>
          <VStack w="100%">
            <Button size={["xs", "sm", "md", "lg"]} w="100%" colorScheme="orange" onClick={connectWithMetamask}>Metamask</Button>
            <Button size={["xs", "sm", "md", "lg"]} w="100%" colorScheme="blue" onClick={connectWithCoinbase}>Coinbase</Button>
          </VStack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default LoginModal