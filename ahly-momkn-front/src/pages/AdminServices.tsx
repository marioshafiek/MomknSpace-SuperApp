import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Button, Spinner, Center } from "@chakra-ui/react";
import axios from "axios";
import ServicesTable from "@components/AdminServices/ServiceTable";
import TablePagination from "@components/AdminCateogry/TablePagination";
import ServicesModal from "@components/AdminServices/ServiceModal";
import { Service } from "../types"; // Make sure this is correct
import Swal from "sweetalert2";

interface Provider {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

const fetchProviderName = async (providerId: string): Promise<string> => {
  try {
    const response = await axios.post(
      "https://superapp-production.up.railway.app/getServiceProviderById",
      { id: providerId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data.spEnglishName || "Unknown Provider";
  } catch (error) {
    console.error("Error fetching provider name:", error);
    return "Unknown Provider";
  }
};

const fetchCategoryName = async (categoryId: string): Promise<string> => {
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

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editService, setEditService] = useState<Service | null>(null);
  const itemsPerPage = 8;

  const fetchProvidersAndCategories = async () => {
    try {
      const [providersResponse, categoriesResponse] = await Promise.all([
        axios.get(
          "https://superapp-production.up.railway.app/ServiceProviders"
        ),
        axios.get(
          "https://superapp-production.up.railway.app/getAllServiceCategories"
        ),
      ]);

      const providersData = providersResponse.data.data.map(
        (provider: any) => ({
          id: provider._id,
          name: provider.spEnglishName,
        })
      );

      const categoriesData = categoriesResponse.data.data.map(
        (category: any) => ({
          id: category._id,
          name: category.categoryEnglishName,
        })
      );

      setProviders(providersData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching providers and categories:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://superapp-production.up.railway.app/allServices"
      );
      const servicesData = response.data.services;
      console.log(servicesData);
      const fetchedServices = await Promise.all(
        servicesData.map(async (service: any) => {
          const providerName = await fetchProviderName(service.providerId);
          const categoryName = await fetchCategoryName(service.categoryId);

          return {
            _id: service._id,
            serviceName: service.name,
            description: service.description,
            provider: providerName,
            category: categoryName,
            type: service.type,
            fees: service.fees,
            from: service.type === "scheduled" ? service.from : null,
            to: service.type === "scheduled" ? service.to : null,
            status: service.state,
            image: service.image.secure_url,
          };
        })
      );

      setServices(fetchedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProvidersAndCategories();
    fetchServices();
  }, []);

  const totalPages = Math.ceil(services.length / itemsPerPage);

  const currentData = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = () => {
    fetchServices();
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleDelete = async (serviceId: string) => {
    try {
      console.log(serviceId);
      const response = await axios.delete(
        "https://superapp-production.up.railway.app/deleteService",
        {
          data: {
            serviceId: serviceId,
          },
        }
      );
      console.log("Deleted Service");
      Swal.fire({
        title: "Deleted!",
        text: "The service has been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
      fetchServices();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error deleting the service provider.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error deleting service:", error);
    }
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Text fontSize="2xl" fontWeight="bold">
          {services.length} Services
        </Text>
        <Button colorScheme="green" onClick={() => setIsModalOpen(true)}>
          Add Service
        </Button>
      </Flex>

      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box bg="white" p={5} rounded="lg" boxShadow="md" overflowX="auto">
          <ServicesTable
            data={currentData}
            columns={[
              "Service",
              "Description",
              "Provider",
              "Category",
              "Type",
              "Fees",
              "From",
              "To",
              "Status",
              "Actions",
            ]}
            onEdit={(service) => {
              setEditService(service);
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

      <ServicesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        providers={providers}
        categories={categories}
      />

      {editService && (
        <ServicesModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
          providers={providers}
          categories={categories}
        />
      )}
    </Box>
  );
};

export default AdminServices;
