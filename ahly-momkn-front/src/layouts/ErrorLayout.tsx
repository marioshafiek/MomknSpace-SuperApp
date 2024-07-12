// src/layouts/ErrorLayout/ErrorLayout.tsx
import React, { ReactNode } from "react";
import { Box, Heading, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

interface ErrorLayoutProps {
  children?: ReactNode;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <Container centerContent>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h1" size="xl" mb={6}>
          Something went wrong
        </Heading>
        <Outlet></Outlet>
      </Box>
    </Container>
  );
};

export default ErrorLayout;
