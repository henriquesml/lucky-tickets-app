import React from 'react'
import { Button, useMediaQuery } from '@chakra-ui/react'
import { FaCoins, FaTicketAlt } from 'react-icons/fa'
import { ethers } from 'ethers'

type TicketsButtonProps = {
  userTickets: number
  winnings: number | undefined
  onOpenWinningModal: () => void
}

function TicketsButton({ userTickets, winnings = 0, onOpenWinningModal }: TicketsButtonProps) {
  const [isLargerThan780] = useMediaQuery("(min-width: 780px)")
  const buttonText = isLargerThan780 ? `Sacar ${ethers.utils.formatEther(winnings.toString())} BNB` : "Sacar"

  return (
    <Button
      size={["sm", "md", "lg"]}
      leftIcon={winnings > 0 ? <FaCoins /> : <FaTicketAlt />}
      bg="yellow.200"
      _hover={{ bg:"yellow.300" }}
      _active={{ bg: "yellow.400" }}
      onClick={winnings > 0 ? onOpenWinningModal : () => {}}
    >
      { winnings > 0 ? buttonText : userTickets }
    </Button>
  )
}

export default TicketsButton