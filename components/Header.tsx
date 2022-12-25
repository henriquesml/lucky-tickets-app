import React, { useEffect } from 'react'
import { Flex, useDisclosure } from '@chakra-ui/react'
import Logo from './Logo'
import AdminsControl from './AdminsControl'
import TicketsButton from './TicketsButton'
import LoginButton from './LoginButton'
import LoginModal from './LoginModal'
import WinningModal from './WinningModal'

type HeaderProps = {
  address: string | undefined
  lotteryOperator: string | undefined
  userTickets: number
  winnings: number | undefined
  drawWinnerTicket: Function
  withdrawCommission: Function
  restartDraw: Function
  totalCommission: string | undefined
  withdrawWinnings: Function
}

function Header({ address, lotteryOperator, userTickets, winnings, drawWinnerTicket, withdrawCommission, restartDraw, totalCommission, withdrawWinnings  }: HeaderProps) {
  
  const { isOpen: isOpenLoginModal, onOpen: onOpenLoginModal, onClose: onCloseLoginModal } = useDisclosure()
  const { isOpen: isOpenWinningModal, onOpen: onOpenWinningModal, onClose: onCloseWinningModal } = useDisclosure()

  useEffect(() => {
    if (address) {
      onCloseLoginModal()
    }
  }, [address])

  useEffect(() => {
    if (Number(winnings) > 0) {
      onOpenWinningModal()
    }
  }, [winnings, address])

  return (
    <Flex h="100px" w="100%" bg="blackAlpha.900" align="center" justify="space-between" px={["4", "8", "26", "32", "60", "60"]} borderBottom="2px" borderColor="gray.900">
      <Logo />
      <Flex>
        {address && address === lotteryOperator ?
          <AdminsControl
            drawWinnerTicket={drawWinnerTicket}
            withdrawCommission={withdrawCommission}
            restartDraw={restartDraw}
            totalCommission={totalCommission}
          /> 
          : <TicketsButton onOpenWinningModal={onOpenWinningModal} userTickets={userTickets} winnings={winnings} />}
        <LoginButton address={address} onOpen={onOpenLoginModal} />
      </Flex>
      <LoginModal isOpen={isOpenLoginModal} onClose={onCloseLoginModal} />
      <WinningModal isOpen={isOpenWinningModal} onClose={onCloseWinningModal} winnings={winnings} withdrawWinnings={withdrawWinnings} />
    </Flex>
  )
}

export default Header