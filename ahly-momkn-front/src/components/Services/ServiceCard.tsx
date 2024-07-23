import React from "react";
import {
  Box,
  Badge,
  Text,
  Button,
  VStack,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ReserveModal from "@components/Services/ServicesModal"; // Adjust the import path as needed

interface ServiceCardProps {
  title: string;
  badgeText: string;
  description: string;
  serviceFees: number;
  type: string;
  onReserve: (selectedTime: string, selectedDate: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  badgeText,
  description,
  serviceFees,
  type,
  onReserve,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        maxW="600px"
        w="full"
        bg={useColorModeValue("white", "white")}
        boxShadow="base"
        rounded="lg"
        p={6}
        textAlign="left"
        m={4}
      >
        <VStack spacing={4} align="left">
          <Flex justify="space-between" align="center">
            <Text fontSize="2xl" fontWeight="bold" color={"#262626"}>
              {title}
            </Text>
            <Badge colorScheme="green">{badgeText}</Badge>
          </Flex>
          <Text fontSize="md" color={"#262626"}>
            {description}
          </Text>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" fontWeight="bold" color={"#262626"}>
              Service Fees:
            </Text>
            <Text fontSize="sm" fontWeight="bold" color={"#262626"}>
              ${serviceFees}
            </Text>
          </Flex>
          <Flex justify="flex-end" w="full">
            <Button
              bg={"#06B479"}
              color={"white"}
              variant="solid"
              onClick={onOpen}
            >
              Reserve
            </Button>
          </Flex>
        </VStack>
      </Box>

      <ReserveModal
        isOpen={isOpen}
        onClose={onClose}
        type={type}
        title={title}
        description={description}
        serviceFees={serviceFees}
        onReserve={onReserve}
      />
    </>
  );
};

export default ServiceCard;
