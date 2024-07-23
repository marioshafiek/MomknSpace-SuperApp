import React, { useEffect, useState } from "react";
import { SimpleGrid, Box, Flex, Center, Spinner } from "@chakra-ui/react";
import ServiceCategoryCard from "@components/ServicesCategory/CategoryCard";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useSearch } from "../SearchContext";

interface Category {
  _id: string;
  categoryEnglishName: string;
  image: {
    secure_url: string;
  };
}

const ServicesCategory: React.FC = () => {
  const location = useLocation();
  const isCategoryRoute = location.pathname === "/category";
  const { searchQuery } = useSearch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://superapp-production.up.railway.app/getAllServiceCategories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.categoryEnglishName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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
          {isLoading ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : (
            isCategoryRoute && (
              <SimpleGrid columns={[1, null, 2, 3]} spacing={10}>
                {filteredCategories.map((category) => (
                  <ServiceCategoryCard
                    key={category._id}
                    imageSrc={category.image.secure_url}
                    title={category.categoryEnglishName}
                    categoryId={category._id}
                  />
                ))}
              </SimpleGrid>
            )
          )}
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default ServicesCategory;
