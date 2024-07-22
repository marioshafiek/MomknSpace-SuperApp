import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Button, Spinner, Center } from "@chakra-ui/react";
import ProvidersTable from "@components/AdminProvider/ProvidersTable";
import TablePagination from "@components/AdminCateogry/TablePagination";
import ProvidersModal from "@components/AdminProvider/ProviderModal";
import axios from "axios";
import Swal from "sweetalert2";

interface Provider {
  _id: string;
  spEnglishName: string;
  spArabicName: string;
  active: boolean;
  categoryId: string;
  categoryName?: string;
}

// Add this type definition
interface ProviderFormData {
  spEnglishName: string;
  spArabicName: string;
  active: boolean;
  categoryId: string;
}

const fetchProviders = async () => {
  try {
    const response = await axios.get(
      "https://superapp-production.up.railway.app/ServiceProviders"
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    return [];
  }
};

const fetchCategoryById = async (categoryId: string): Promise<string> => {
  try {
    const response = await axios.post(
      "https://superapp-production.up.railway.app/getServiceCategoryById",
      { id: categoryId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data.categoryEnglishName || "Unknown Category";
  } catch (error) {
    console.error("Error fetching category name:", error);
    return "Unknown Category";
  }
};

const AdminProviders: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editProvider, setEditProvider] = useState<Provider | null>(null);
  const [deleting, setDeleting] = useState(false);
  const itemsPerPage = 8;

  const fetchProvidersAndCategories = async () => {
    setIsLoading(true);
    try {
      const providersData = await fetchProviders();

      const providersWithCategoryNames = await Promise.all(
        providersData.map(async (provider: Provider) => {
          const categoryName = await fetchCategoryById(provider.categoryId);
          return { ...provider, categoryName };
        })
      );

      setProviders(providersWithCategoryNames);
    } catch (error) {
      console.error("Error fetching providers and categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProvidersAndCategories();
  }, []);

  const totalPages = Math.ceil(providers.length / itemsPerPage);

  const currentData = providers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = (data: ProviderFormData) => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    fetchProvidersAndCategories(); // Refresh data after save
  };

  const handleDelete = async (providerId: string) => {
    setDeleting(true);
    try {
      const response = await axios.delete(
        "https://superapp-production.up.railway.app/deleteServiceProvider",
        {
          data: {
            providerId: providerId,
          },
        }
      );

      Swal.fire({
        title: "Deleted!",
        text: "The service provider has been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });

      fetchProvidersAndCategories();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error deleting the service provider.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error deleting provider:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Text fontSize="2xl" fontWeight="bold">
          {providers.length} Service Providers
        </Text>
        <Button colorScheme="green" onClick={() => setIsModalOpen(true)}>
          Add Service Provider
        </Button>
      </Flex>

      {isLoading || deleting ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box bg="white" p={5} rounded="lg" boxShadow="md" overflowX="auto">
          <ProvidersTable
            data={currentData}
            columns={[
              "Service Provider (English)",
              "Service Provider (Arabic)",
              "Category",
              "Status",
              "Actions",
            ]}
            onEdit={(provider) => {
              setEditProvider(provider);
              setIsEditModalOpen(true);
            }}
            onDelete={handleDelete}
          />
          <TablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </Box>
      )}

      <ProvidersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {editProvider && (
        <ProvidersModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
          initialData={editProvider}
        />
      )}
    </Box>
  );
};

export default AdminProviders;
