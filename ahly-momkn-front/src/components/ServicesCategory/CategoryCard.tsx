import React from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ServiceCategoryCardProps {
  imageSrc: string;
  title: string;
  categoryId: string;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({
  imageSrc,
  title,
  categoryId,
}) => {
  return (
    <Link to={`/category/${categoryId}/providers`}>
      <Box
        width="350px"
        height="300px"
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
        </VStack>
      </Box>
    </Link>
  );
};

export default ServiceCategoryCard;
