import React from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import ProviderCard from "@components/ServiceProviders/ProviderCard"; // Adjust the import path as needed
import Header from "@components/ServiceHeader"; // Adjust the import path as needed
import { useSearch } from "../SearchContext";

const mockProviders = [
  {
    id: 1,
    imageSrc: "https://via.placeholder.com/150",
    title: "Provider 1",
    categoryId: 1,
    status: "active",
  },
  {
    id: 2,
    imageSrc: "https://via.placeholder.com/150",
    title: "Provider 2",
    categoryId: 2,
    status: "active",
  },
  {
    id: 3,
    imageSrc: "https://via.placeholder.com/150",
    title: "Provider 3",
    categoryId: 3,
    status: "inactive",
  },
  {
    id: 4,
    imageSrc: "https://via.placeholder.com/150",
    title: "Provider 4",
    categoryId: 4,
    status: "inactive",
  },
  {
    id: 5,
    imageSrc: "https://via.placeholder.com/150",
    title: "Provider 5",
    categoryId: 5,
    status: "inactive",
  },
  {
    id: 6,
    imageSrc: "https://via.placeholder.com/150",
    title: "Provider 6",
    categoryId: 6,
    status: "inactive",
  },
];

const ServicesProvider: React.FC = () => {
  const location = useLocation();
  const isChildRoute = location.pathname.includes("/services");
  const { searchQuery } = useSearch(); // Use the search context

  // Filter providers based on search query
  const filteredProviders = mockProviders.filter((provider) =>
    provider.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={5}>
      {!isChildRoute && (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={30}>
          {filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              imageSrc={provider.imageSrc}
              title={provider.title}
              providerId={provider.categoryId}
              status={provider.status}
            />
          ))}
        </SimpleGrid>
      )}
      <Outlet />
    </Box>
  );
};

export default ServicesProvider;
