import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    fonts: {
      body: `roboto, sans-serif`
    }
  })

  return (
    <ThirdwebProvider desiredChainId={ChainId.BinanceSmartChainTestnet}>
      <ChakraProvider theme={theme}>
        <Box w="100vw" h="100vh" bg="#000">
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </ThirdwebProvider>
  )
}
