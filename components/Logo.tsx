import React from 'react'
import { Heading, HStack, Icon } from '@chakra-ui/react'
import { FaTicketAlt } from 'react-icons/fa'

function Logo() {
  return (
    <HStack spacing={["2", "2", "3", "4"]}>
      <Icon as={FaTicketAlt} fontSize={["18", "22", "26", "30"]} color="yellow.400" />
      <Heading fontFamily="roboto" color="white" fontSize={["sm", "lg", "xl", "2xl","3xl"]}>
        Lucky Tickets
      </Heading>
    </HStack>
  )
}

export default Logo