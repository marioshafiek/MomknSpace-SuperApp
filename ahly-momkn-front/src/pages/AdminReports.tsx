import React, { useEffect, useState } from "react";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import ReportTable from "@components/AdminReport/ReportTable";
import { useSearch } from "../SearchContext";

interface Booking {
  _id: string;
  dateTime: string;
  serviceId: string;
  providerId: string;
  categoryId: string;
  consumerName: string;
  mobileNumber: string;
}

interface Service {
  _id: string;
  name: string;
  description: string;
  fees: number;
  from: string;
  to: string;
}

interface Category {
  _id: string;
  categoryEnglishName: string;
}

interface Provider {
  _id: string;
  name: string;
}

const AdminReport: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://superapp-production.up.railway.app/getAllBookings"
        );
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://superapp-production.up.railway.app/allServices"
        );
        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://superapp-production.up.railway.app/getAllServiceCategories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          "https://superapp-production.up.railway.app/ServiceProviders"
        );
        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([
        fetchBookings(),
        fetchServices(),
        fetchCategories(),
        fetchProviders(),
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getServiceDetails = (serviceId: string) => {
    return (
      services.find((service) => service._id === serviceId) || {
        name: "Unknown",
        description: "Unknown",
        fees: 0,
        from: "Unknown",
        to: "Unknown",
      }
    );
  };

  const reportData = bookings.map((booking) => {
    const service = getServiceDetails(booking.serviceId);

    return {
      id: booking._id,
      customerName: booking.consumerName,
      phoneNumber: booking.mobileNumber,
      service: service.name,
      serviceDescription: service.description,
      serviceFees: service.fees,
      serviceFrom: service.from,
      serviceTo: service.to,
      categoryId: booking.categoryId,
      providerId: booking.providerId,
      reserveDate: booking.dateTime.split("T")[0],
      reserveTime: booking.dateTime.split("T")[1].split(".")[0],
    };
  });

  const filteredData = reportData.filter(
    (data) =>
      data.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.phoneNumber.includes(searchQuery) ||
      data.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveBooking = (id: string) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking._id !== id)
    );
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        Reports ({filteredData.length})
      </Text>
      <Box bg="white" p={5} rounded="lg" boxShadow="md" overflowX="auto">
        <ReportTable
          data={filteredData}
          onRemoveBooking={handleRemoveBooking}
        />
      </Box>
    </Box>
  );
};

export default AdminReport;
