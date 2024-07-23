import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const ReportDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const details = location.state;

  const [categoryName, setCategoryName] = useState<string>("");
  const [providerName, setProviderName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategory = async () => {
      console.log(details.categoryId);
      try {
        const response = await axios.post(
          "https://superapp-production.up.railway.app/getServiceCategoryById",
          {
            id: details.categoryId,
          }
        );
        setCategoryName(response.data.data.categoryEnglishName);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    const fetchProviders = async () => {
      console.log(details.providerId);
      try {
        const response = await axios.get(
          "https://superapp-production.up.railway.app/ServiceProviders"
        );
        const provider = response.data.data.find(
          (provider: { _id: string }) => provider._id === details.providerId
        );
        setProviderName(provider ? provider.spEnglishName : "Unknown");
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    const fetchData = async () => {
      await fetchCategory();
      await fetchProviders();
      setLoading(false);
    };

    fetchData();
  }, [details.categoryId, details.providerId]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown";
    try {
      return format(new Date(dateString), "yyyy-MM-dd");
    } catch (error) {
      console.error("Invalid date value:", dateString);
      return "Invalid date";
    }
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "Unknown";
    try {
      return format(new Date(dateString), "HH:mm:ss");
    } catch (error) {
      console.error("Invalid time value:", dateString);
      return "Invalid time";
    }
  };

  return (
    <Box
      p={5}
      maxW="full"
      mx="auto"
      bg="white"
      borderRadius="md"
      boxShadow="md"
    >
      <Button mb={5} onClick={() => navigate(-1)} bg="#06B479" color={"white"}>
        Back
      </Button>
      <VStack align="start" spacing={6}>
        <Heading as="h2" size="lg" mb={4}>
          Report Details
        </Heading>
        <Box w="100%" p={4} bg="gray.50" borderRadius="md">
          <Heading as="h3" size="md" mb={3}>
            Consumer Details
          </Heading>
          <Divider mb={3} />
          <Stack spacing={2}>
            <Flex>
              <Text fontWeight="bold" w="150px">
                Consumer Name:
              </Text>
              <Text>{details.customerName}</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" w="150px">
                Phone Number:
              </Text>
              <Text>{details.phoneNumber}</Text>
            </Flex>
          </Stack>
        </Box>
        <Box w="100%" p={4} bg="gray.50" borderRadius="md">
          <Heading as="h3" size="md" mb={3}>
            Service Details
          </Heading>
          <Divider mb={3} />
          <Stack spacing={2}>
            <Flex>
              <Text fontWeight="bold" w="150px">
                Service Name:
              </Text>
              <Text>{details.service}</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" w="150px">
                Description:
              </Text>
              <Text>{details.serviceDescription}</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" w="150px">
                Fees:
              </Text>
              <Text>${details.serviceFees}</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" w="150px">
                Category Name:
              </Text>
              <Text>{categoryName}</Text>
            </Flex>

            <Flex direction="row">
              <Text fontWeight="bold" w="150px">
                Service From:
              </Text>
              <VStack align="start">
                <Text>{formatDate(details.serviceFrom)}</Text>
                <Text>{formatTime(details.serviceFrom)}</Text>
              </VStack>
            </Flex>
            <Flex direction="row">
              <Text fontWeight="bold" w="150px">
                Service To:
              </Text>
              <VStack align="start">
                <Text>{formatDate(details.serviceTo)}</Text>
                <Text>{formatTime(details.serviceTo)}</Text>
              </VStack>
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" w="150px">
                Date:
              </Text>
              <Text>{details.reserveDate}</Text>
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" w="150px">
                Time:
              </Text>
              <Text>{details.reserveTime}</Text>
            </Flex>
          </Stack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ReportDetails;
