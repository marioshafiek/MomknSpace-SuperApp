import React, { useEffect, useState } from "react";
import { SimpleGrid, Box, Center, Spinner, Flex } from "@chakra-ui/react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import ProviderCard from "@components/ServiceProviders/ProviderCard"; // Adjust the import path as needed
import axios from "axios";
import { useSearch } from "../SearchContext";
import Header from "@components/ServiceHeader";

interface Provider {
  _id: string;
  imageSrc: string;
  title: string;
  categoryId: string;
  status: string;
}

const ServicesProvider: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>(); // Get categoryId from URL params
  const location = useLocation();
  const isChildRoute = location.pathname.includes("/services");
  const { searchQuery } = useSearch(); // Use the search context

  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          "https://superapp-production.up.railway.app/ServiceProviders"
        );
        console.log(response.data.data);
        const providersData = response.data.data.map((provider: any) => ({
          _id: provider._id,
          imageSrc:
            "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          title: provider.spEnglishName,
          categoryId: provider.categoryId,
          status: provider.active ? "active" : "inactive",
        }));
        setProviders(providersData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Filter providers based on categoryId and search query
  const filteredProviders = providers.filter(
    (provider) =>
      provider.categoryId === categoryId &&
      provider.title.toLowerCase().includes(searchQuery.toLowerCase())
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
        {!isChildRoute && <Header title="Providers" />}
        {isLoading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={30}>
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider._id}
                imageSrc={provider.imageSrc}
                title={provider.title}
                providerId={provider._id} // Changed from categoryId to _id
                status={provider.status}
              />
            ))}
          </SimpleGrid>
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default ServicesProvider;
