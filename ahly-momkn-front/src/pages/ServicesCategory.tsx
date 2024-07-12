import React from "react";
import { SimpleGrid, Box, Flex } from "@chakra-ui/react";
import ServiceCategoryCard from "@components/ServicesCategory/CategoryCard";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/common/header/Header";
import { useSearch } from "../SearchContext";

const categories = [
  { id: 1, imageSrc: "https://via.placeholder.com/150", title: "Category 1" },
  { id: 2, imageSrc: "https://via.placeholder.com/150", title: "Category 2" },
  { id: 3, imageSrc: "https://via.placeholder.com/150", title: "Category 3" },
  { id: 4, imageSrc: "https://via.placeholder.com/150", title: "Category 4" },
  { id: 5, imageSrc: "https://via.placeholder.com/150", title: "Category 5" },
  { id: 6, imageSrc: "https://via.placeholder.com/150", title: "Category 6" },
];

const ServicesCategory: React.FC = () => {
  const location = useLocation();
  const isCategoryRoute = location.pathname === "/category";
  const { searchQuery } = useSearch();

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Flex justify="center" p={5}>
        <Box
          bg="white"
          p={10}
          rounded="lg"
          boxShadow="md"
          width="full"
          maxW="1200px"
        >
          {isCategoryRoute && (
            <SimpleGrid columns={[1, null, 2, 3]} spacing={10}>
              {filteredCategories.map((category) => (
                <ServiceCategoryCard
                  key={category.id}
                  imageSrc={category.imageSrc}
                  title={category.title}
                  categoryId={category.id}
                />
              ))}
            </SimpleGrid>
          )}
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default ServicesCategory;
