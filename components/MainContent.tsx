import React, { useState } from 'react'
import { Badge, Button, Flex, Heading, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useToast, VStack } from '@chakra-ui/react'
import Marquee from "react-fast-marquee"
import { ethers } from 'ethers'
import Countdown from './Countdown'

type MainContentProps = {
  lotteryOperator: string | undefined
  address: string | undefined
  currentWinningReward: string | undefined
  ticketPrice: string | undefined
  expiration: number | undefined
  tickets: string[] | undefined
  lastWinner: string | undefined
  lastWinnerAmount: string | undefined
  totalWallets: string[]
  buyTickets: Function
}

function MainContent({
  lotteryOperator,
  address,
  currentWinningReward,
  ticketPrice,
  expiration,
  tickets,
  lastWinner,
  lastWinnerAmount,
  totalWallets,
  buyTickets
}: MainContentProps) {
  const [quantity, setQuantity] = useState(1)
  const [loadingBuy, setLoadingBuy] = useState(false)

  const toast = useToast()

  const onBuyTickets = async () => {
    if (!ticketPrice) return

    if (!address) {
      if (!toast.isActive("buy-without-address")) {
        toast({
          id: "buy-without-address",
          status: "info",
          position: "bottom-right",
          description: "Para comprar tickets você precisa entrar com sua carteira primeiro."
        })
      }
      return
    }

    setLoadingBuy(true)
    toast({
      status: "info",
      position: "bottom-right",
      description: "Comprando ticket(s)."
    })

    try {
      await buyTickets([{
        value: ethers.utils.parseEther(
          String(
            Number(ethers.utils.formatEther(String(ticketPrice))) * quantity
          )
        )
      }])

      toast({
        status: "success",
        position: "bottom-right",
        description: "Ticket(s) comprados com sucesso."
      })
    } catch {
      toast({
        status: "error",
        position: "bottom-right",
        description: "Um erro ocorreu ao tentar comprar ticket(s), por favor tente novamente."
      })
    } finally {
      setLoadingBuy(false)
    }
  }

  return (
    <Flex h="calc(100vh - 100px)" flexDir="column" px={["4", "8",  "26", "32", "60", "60"]} align="center" pos="relative" overflow="auto">
      <Flex h="80px" zIndex="2" w="100%" pos="fixed" bottom="0" bg="#111" p="4" borderTop="2px" borderTopColor="gray.900">
        <Marquee gradient={false} speed={60}>
          <VStack align="start" color="white" spacing="1">
            <HStack spacing="1">
              <Text fontSize={["10", "xs","sm"]}>Último ganhado:</Text>
              <Text fontSize={["10", "xs","sm"]}>{lastWinner}</Text>
            </HStack>

            <HStack spacing="1">
              <Text fontSize={["10", "xs","sm"]}>Quantidade:</Text>
              <Text fontSize={["10", "xs","sm"]}>{lastWinnerAmount && ethers.utils.formatEther(String(lastWinnerAmount))}</Text>
              <Text fontSize={["10", "xs","sm"]}>BNB</Text>
            </HStack>
          </VStack>
        </Marquee>
      </Flex>
      
      <Flex w="100%" h="100%" minH="650px" flexDir={["column", "column", "column", "column", "column", "row"]} mb={["120px", "180px", "300px", "420px", "420px","120px"]}>
        <Flex flexDir="column" mt={["14", "14", "14", "14","14","0"]} w={["100%", "100%", "100%", "100%","100%","50%"]} justify="center" align={["center", "center", "center", "center","center","start"]}>
          <VStack w="100%" align={["center", "center", "center", "center","center","start"]} spacing="0" bg="black">
            <Heading color="white" fontSize={["3xl", "4xl","5xl","6xl"]}>
              Prêmio final
            </Heading>
            <HStack spacing={["1", "2", "2", "4","4","4"]} align="center">
              <Heading color="white" fontSize={["5xl", "6xl","7xl","8xl"]}>{currentWinningReward && Number(ethers.utils.formatEther(String(currentWinningReward))).toFixed(3)}</Heading>
              <Heading color="yellow.400" fontSize={["5xl", "6xl","7xl","8xl"]}>BNB</Heading>
            </HStack>

            <Countdown expiration={Number(expiration)} />
          </VStack>

          <HStack mt="4">
            <Badge colorScheme="yellow" fontSize={["10", "xs", "sm"]}>Tickets vendidos {tickets?.length}</Badge>
            <Badge colorScheme="yellow" fontSize={["10", "xs", "sm"]}>Participantes {totalWallets.length}</Badge>
          </HStack>
        </Flex>


        <Flex mt={["14", "14", "14", "14","14","0"]} w={["100%", "100%", "100%", "100%","100%","50%"]}>
          <VStack w="100%" justify="center" align={["center", "center", "center", "center","center","end"]} spacing="4">
            <VStack align="start" p="8" spacing="8" w={["100%", "100%", "100%", "100%","100%","500px"]} bg="#141414" borderRadius="md">
              <Heading color="white" fontSize={["xl", "2xl", "3xl", "4xl"]}>Comprar tickets</Heading>

              <VStack w="100%" spacing="4" fontSize={["xs", "sm","md","lg"]}>
                <VStack w="100%" spacing="4">
                  <Flex w="100%" color="white" justify="space-between">
                    <Text>Preço por ticket</Text>
                    <HStack spacing="1">
                      <Text>{ticketPrice && ethers.utils.formatEther(String(ticketPrice))}</Text>
                      <Text>BNB</Text>
                    </HStack>
                  </Flex>

                  <NumberInput size={["xs", "sm","md","lg"]} mt="2" w="100%" defaultValue={1} min={1} value={quantity} onChange={value => setQuantity(Number(value))}>
                    <NumberInputField bg="white" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </VStack>

                <HStack w="100%" justify="space-between">
                  <Button size={["xs", "sm","sm"]} variant="outline" colorScheme="yellow" w="100%" onClick={() => setQuantity(5)}>x5</Button>
                  <Button size={["xs", "sm","sm"]} variant="outline" colorScheme="yellow" w="100%" onClick={() => setQuantity(10)}>x10</Button>
                  <Button size={["xs", "sm","sm"]} variant="outline" colorScheme="yellow" w="100%" onClick={() => setQuantity(50)}>x50</Button>
                  <Button size={["xs", "sm","sm"]} variant="outline" colorScheme="yellow" w="100%" onClick={() => setQuantity(100)}>x100</Button>
                </HStack>
              </VStack>

              <VStack w="100%" spacing="1" color="white" fontSize={["xs", "sm","md","lg"]}>
                <Flex w="100%" justify="space-between" fontWeight="bold">
                  <Text>Custo total dos tickets</Text>
                  <HStack spacing="1">
                    <Text>{ticketPrice && (Number(ethers.utils.formatEther(String(ticketPrice))) * quantity).toFixed(2)}</Text>
                    <Text>BNB</Text>
                  </HStack>
                </Flex>

                <Flex w="100%" justify="space-between">
                  <Text>+ Taxas de rede</Text>
                  <Text>TBC</Text>
                </Flex>
              </VStack>

              <Button
                w="100%"
                colorScheme="yellow"
                size={["xs", "sm","md","lg"]}
                disabled={expiration && String(expiration) < String(Date.now()) || loadingBuy || address === lotteryOperator}
                isLoading={loadingBuy}
                onClick={onBuyTickets}
              >
                <HStack fontSize={["xs", "sm","md","lg"]}>
                  <Text>Comprar {quantity} ticket(s) por</Text>
                  <Text>{ticketPrice && (Number(ethers.utils.formatEther(String(ticketPrice))) * quantity).toFixed(2)}</Text>
                  <Text>BNB</Text>
                </HStack>
              </Button>
            </VStack>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MainContent