import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Button, Spinner, Center } from "@chakra-ui/react";
import Table from "@components/AdminCateogry/CateogryTable";
import TablePagination from "@components/AdminCateogry/TablePagination";
import MultiStepModal from "@components/AdminCateogry/MultiStepModal";
import { Category } from "../types"; // Define a Category type

const AdminCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const itemsPerPage = 8;

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://superapp-production.up.railway.app/getAllServiceCategories"
      );
      const responseData = await response.json();
      const categoriesData = responseData.data;
      const serializedMap = responseData.serializedMap;

      const fetchedCategories = await Promise.all(
        categoriesData.map(async (category: any) => {
          const serviceCount =
            serializedMap.find((item: any) => item.categoryId === category._id)
              ?.count || 0;

          const providerResponse = await fetch(
            "https://superapp-production.up.railway.app/getAllServiceProviders",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({ categoryId: category._id }),
            }
          );
          const providerData = await providerResponse.json();
          const numberOfProviders = providerData.totalProviders || 0;

          return {
            category: category.categoryEnglishName,
            categoryArabicName: category.categoryArabicName,
            numberOfProviders: numberOfProviders,
            numberOfServices: serviceCount,
            serviceAgent: "N/A",
            status: category.active ? "active" : "inactive",
            image: category.image.secure_url, // Add image URL
          };
        })
      );

      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const currentData = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = () => {
    fetchCategories();
    setIsModalOpen(false);
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Text fontSize="2xl" fontWeight="bold">
          {categories.length} Service Category
        </Text>
        <Button
          bg={"#06B479"}
          color={"white"}
          onClick={() => setIsModalOpen(true)}
        >
          Add Category
        </Button>
      </Flex>

      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box bg="white" p={5} rounded="lg" boxShadow="md" overflowX="auto">
          <Table
            data={currentData}
            columns={[
              "Category Name",
              "Category Name (Arabic)",
              "Number of Providers",
              "Number of Services",
              "Status",
            ]}
          />
          <TablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </Box>
      )}

      <MultiStepModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default AdminCategory;
