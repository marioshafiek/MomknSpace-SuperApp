import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Button, Spinner, Center } from "@chakra-ui/react";
import Table from "@components/AdminAgent/ServiceAgentsTable";
import TablePagination from "@components/AdminCateogry/TablePagination";
import ServiceAgentsModal from "@components/AdminAgent/ServiceAgentsModal";
import axios from "axios";

interface Agent {
  _id: string;
  agentEnglishName: string;
  agentArabicName: string;
  serviceId: string;
  serviceAgentfees: number;
  state: string;
  isVisible: boolean;
  hasCalendar: boolean;
  serviceName: string; // This will be mapped from serviceId
}

interface Service {
  id: string;
  name: string;
}

const fetchAgents = async () => {
  try {
    const response = await axios.get(
      "https://superapp-production.up.railway.app/getallServiceAgent"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
};

const fetchServices = async () => {
  try {
    const response = await axios.get(
      "https://superapp-production.up.railway.app/allServices"
    );
    return response.data.services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

const AdminAgent: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  const fetchAgentsAndServices = async () => {
    setIsLoading(true);
    try {
      const agentsData = await fetchAgents();
      const servicesData = await fetchServices();

      const servicesMap = servicesData.reduce((map: any, service: any) => {
        map[service._id] = service.name;
        return map;
      }, {});

      const mappedAgents = agentsData.map((agent: any) => ({
        ...agent,
        serviceName: servicesMap[agent.serviceId] || "Unknown Service",
      }));

      setAgents(mappedAgents);
      setServices(servicesData); // Set services data here
    } catch (error) {
      console.error("Error fetching agents and services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentsAndServices();
  }, []);

  const totalPages = Math.ceil(agents.length / itemsPerPage);

  const currentData = agents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = (data: any) => {
    console.log(services);
    console.log(data);
    setIsModalOpen(false);
    fetchAgentsAndServices();
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Text fontSize="2xl" fontWeight="bold">
          {agents.length} Service Agents
        </Text>
        <Button colorScheme="green" onClick={() => setIsModalOpen(true)}>
          Add Service Agent
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
              "Agent English Name",
              "Agent Arabic Name",
              "Service Name",
              "Is Visible",
              "Fees",
              "Has Calendar",
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

      <ServiceAgentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default AdminAgent;
