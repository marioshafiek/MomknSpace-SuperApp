// src/pages/ErrorPage.tsx
import React from "react";
import { Box, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <VStack spacing={4} align="center" py={10} px={6}>
      <Heading as="h2" size="xl" color="#68D391" mb={4}>
        Oops! Page not found.
      </Heading>
      <Text fontSize="lg" color="black" mb={6}>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Text>
      <Button as={Link} to="/" bg={"#68D391"} variant="solid" size="lg" px={6}>
        Go to Home
      </Button>
    </VStack>
  );
};

export default ErrorPage;
