import React from "react";
import { Badge, Box, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ProviderCardProps {
  imageSrc: string;
  title: string;
  providerId: string;
  status: string;
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  imageSrc,
  title,
  providerId,
  status,
}) => {
  return (
    <Link to={`/services/${providerId}`}>
      <Box
        width="250px"
        height="400px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        bg="white"
        textAlign="center"
        _hover={{ boxShadow: "lg", cursor: "pointer" }}
        transition="box-shadow 0.2s"
      >
        <VStack spacing={4} align="center" justify="center" height="100%">
          <Image
            src={imageSrc}
            borderRadius="full"
            boxSize="80px"
            objectFit="cover"
            alt={title}
          />
          <Text fontSize="xl" fontWeight="bold" color="gray.700">
            {title}
          </Text>
          <Badge colorScheme={status === "active" ? "green" : "red"}>
            {status}
          </Badge>
        </VStack>
      </Box>
    </Link>
  );
};

export default ProviderCard;
