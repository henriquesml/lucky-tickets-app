import React from 'react'
import { Center, Progress, VStack } from '@chakra-ui/react'
import Logo from './Logo'

function Loading() {
  return (
    <Center w="100%" h="100%">
      <VStack spacing="4">
        <Logo />
        <Progress w="100%" size="xs" isIndeterminate colorScheme="yellow" />
      </VStack>
    </Center>
  )
}

export default Loading