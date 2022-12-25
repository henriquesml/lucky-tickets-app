import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast, VStack } from '@chakra-ui/react'
import { ethers } from 'ethers'
import React, { useState } from 'react'
import { FaCoins } from 'react-icons/fa'

type WinningModalProps = {
  isOpen: boolean
  onClose: () => void
  winnings: number | undefined
  withdrawWinnings: Function
}

function WinningModal({ isOpen, onClose, winnings, withdrawWinnings }: WinningModalProps) {
  const [loadingWithdraw, setLoadingWithdraw] = useState(false)
  const toast = useToast()

  const onWithdrawWinnings = async () => {
    setLoadingWithdraw(true)
    toast({
      status: "info",
      position: "bottom-right",
      description: "Retirando seu prêmio"
    })

    try {
      await withdrawWinnings([{}])
      toast({
        status: "success",
        position: "bottom-right",
        description: "O seu prêmio foi retirado com sucesso."
      })
    } catch (error) {
      toast({
        status: "error",
        position: "bottom-right",
        description: "Um erro ocorreu ao tentar retirar o seu prêmio, por favor tente novamente."
      })
    } finally {
      setLoadingWithdraw(false)
      onClose()
    }
  }

  return (
    <Modal size={["xs", "sm","md","lg"]} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize={["sm", "md", "lg", "xl", "2xl"]}>Parabéns, você ganhou 🎉</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={["4", "6"]}>
            <Text fontSize={["xs", "sm","md"]}>
              Nós estamos muitos felizes em dizer que você foi o sortudo selecionado e vai receber {winnings && ethers.utils.formatEther(winnings.toString())} BNB!
            </Text>

            <Button isLoading={loadingWithdraw} size={["xs", "sm","md","lg"]} w="100%" colorScheme="yellow" leftIcon={<FaCoins />} onClick={onWithdrawWinnings}>
              Sacar {winnings && ethers.utils.formatEther(winnings.toString())} BNB
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default WinningModal