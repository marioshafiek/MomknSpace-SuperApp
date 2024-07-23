import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Center,
  Spinner,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import ServiceCard from "@components/Services/ServiceCard"; // Adjust the import path as needed
import Header from "@components/ServiceHeader"; // Adjust the import path as needed
import axios from "axios";
import Swal from "sweetalert2";
import { useSearch } from "../SearchContext";

interface Service {
  title: string;
  badgeText: string;
  description: string;
  serviceFees: number;
  type: string;
}

const Services: React.FC = () => {
  const { providerId } = useParams<{ providerId: string }>(); // Get providerId from URL params
  const { searchQuery, setSearchQuery } = useSearch();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.post(
          "https://superapp-production.up.railway.app/Services",
          { providerId } // Pass providerId in the request body
        );
        const allServices = response.data.services;
        // Filter services by providerId
        const filteredServices = allServices.filter(
          (service: any) => service.providerId === providerId
        );

        const servicesData = filteredServices.map((service: any) => ({
          title: service.name,
          badgeText: "Popular", // You can adjust this as needed
          description: service.description,
          serviceFees: service.fees,
          type: service.type,
        }));
        setServices(servicesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [providerId]);

  const handleReserve = (
    serviceTitle: string,
    selectedTime: string,
    selectedDate: string
  ) => {
    // Replace this with your API call
    Swal.fire({
      title: "Reservation Confirmed",
      text: `Service: ${serviceTitle}`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  // Filter services based on search query
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      bg="white"
      p={10}
      rounded="lg"
      boxShadow="md"
      width="full"
      maxW="1200px"
      justifyContent={"center"}
      m={5}
    >
      <Box p={5}>
        <Header title="Services" />

        {isLoading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : filteredServices.length > 0 ? (
          <SimpleGrid columns={[1, null, 2]} spacing={10}>
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.title}
                type={service.type}
                title={service.title}
                badgeText={service.badgeText}
                description={service.description}
                serviceFees={service.serviceFees}
                onReserve={(selectedTime, selectedDate) =>
                  handleReserve(service.title, selectedTime, selectedDate)
                }
              />
            ))}
          </SimpleGrid>
        ) : (
          <Center>
            <Text fontSize="xl" color="gray.500">
              No services added.
            </Text>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default Services;
