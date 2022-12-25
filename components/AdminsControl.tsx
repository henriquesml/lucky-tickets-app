import React from 'react'
import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, useMediaQuery, useToast } from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'
import { ethers } from 'ethers'

type AdminsControlProps = {
  drawWinnerTicket: Function
  withdrawCommission: Function
  restartDraw: Function
  totalCommission: string | undefined
}

function AdminsControl({ drawWinnerTicket, withdrawCommission, restartDraw, totalCommission }: AdminsControlProps) {
  const [isLargeThan1650] = useMediaQuery('(min-width: 1650px)')
  const toast = useToast()

  const onWithdrawCommission = async () => {
    toast({
      status: "info",
      position: "bottom-right",
      description: "Retirando comissão."
    })

    try {
      await withdrawCommission([{}])

      toast({
        status: "success",
        position: "bottom-right",
        description: "A comissão foi retirada com sucesso."
      })
    } catch {
      toast({
        status: "error",
        position: "bottom-right",
        description: "Um erro aconteceu ao tentar retirar a comissão, por favor tente novamente."
      })
    }
  }

  const onDrawWinner = async () => {
    toast({
      status: "info",
      position: "bottom-right",
      description: "Selecionando ganhador."
    })

    try {
      await drawWinnerTicket([{}])

      toast({
        status: "success",
        position: "bottom-right",
        description: "Um ganhador foi selecionado com sucesso."
      })
    } catch {
      toast({
        status: "error",
        position: "bottom-right",
        description: "Um erro aconteceu ao tentar selecionar um ganhador, por favor tente novamente."
      })
    }
  }

  const onRestartDraw = async () => {
    toast({
      status: "info",
      position: "bottom-right",
      description: "Reiniciando o sorteio."
    })

    try {
      await restartDraw([{}])

      toast({
        status: "success",
        position: "bottom-right",
        description: "O sorteio foi reiniciado com sucesso."
      })
    } catch {
      toast({
        status: "error",
        position: "bottom-right",
        description: "Um erro aconteceu ao tentar reiniciar o sorteio, por favor tente novamente."
      })
    }
  }

  return (
    <HStack>
      {
        isLargeThan1650 ? 
        <> 
          <Button onClick={onWithdrawCommission}>Sacar {totalCommission && Number(ethers.utils.formatEther(String(totalCommission))).toFixed(3)} BNB</Button>
          <Button onClick={onDrawWinner}>Sortear ganhador</Button>
          <Button onClick={onRestartDraw}>Reiniciar sorteio</Button>
        </>

        : 
          <Menu>
            <MenuButton as={Button} size={["sm", "md", "lg"]} rightIcon={<FaChevronDown />}>
              Ações
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onWithdrawCommission}>
                Sacar {totalCommission && Number(ethers.utils.formatEther(String(totalCommission))).toFixed(3)} BNB
              </MenuItem>

              <MenuItem onClick={onDrawWinner}>
                Sortear ganhador
              </MenuItem>

              <MenuItem onClick={onRestartDraw}>
                Reiniciar sorteio
              </MenuItem>
            </MenuList>
          </Menu>
      }

    </HStack>
  )
}

export default AdminsControl