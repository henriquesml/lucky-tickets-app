import React from 'react'
import { Flex, Heading, HStack, Icon } from '@chakra-ui/react'
import CountdownComponent from 'react-countdown'
import { FaClock } from 'react-icons/fa'

type CountdownProps = {
  expiration: number | undefined
}

type RenderProps = {
  hours: number
  minutes: number
  seconds: number
}

function Render({ hours, minutes, seconds }: RenderProps) {
  if([hours, minutes, seconds].every(value => value === 0)) {
    return (
      <HStack align="start">
        <Flex align="center">
          <Icon as={FaClock} fontSize={["18", "22","26","30"]} color="white" />
        </Flex>
      
        <Heading color="yellow.400" fontSize={["lg", "xl","2xl","3xl"]}>Sorteio encerrado</Heading>
      </HStack>
    )
  } else {
    return (
      <HStack align="start">
        <Flex align="center">
          <Icon as={FaClock} fontSize={["18", "22","26","30"]} color="white" />
        </Flex>
      
        <Heading color="yellow.400" fontSize={["lg", "xl","2xl","3xl"]}>{hours}h {minutes}m {seconds}s</Heading>
        <Heading color="white" fontSize={["lg", "xl","2xl","3xl"]}>até o sorteio</Heading>
      </HStack>
    )
  }
}

function Countdown({ expiration }: CountdownProps) {
  if (expiration) {
    return <CountdownComponent date={new Date(expiration * 1000)} renderer={({ hours, minutes, seconds }) => Render({ hours, minutes, seconds })} />
  } else {
    return <></>
  }
  
}

export default Countdown