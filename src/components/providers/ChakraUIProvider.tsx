'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ReactNode } from 'react';

const theme = extendTheme({});

interface ChakraUIProviderProps {
  children: ReactNode;
}

export function ChakraUIProvider({ children }: ChakraUIProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}
