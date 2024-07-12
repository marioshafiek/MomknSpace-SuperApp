import React from "react";
import { Box, Text, VStack, HStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const reportDetails = {
  customerName: "John Doe",
  nid: "123456789",
  phoneNumber: "123-456-7890",
  email: "john@example.com",
  serviceName: "Cleaning",
  description: "House cleaning service",
  fees: 50,
  dateFrom: "2024-08-01",
  dateTo: "2024-08-01",
  timeFrom: "10:00 AM",
  timeTo: "12:00 PM",
  reserveDate: "2024-07-25",
  reserveTime: "09:00 AM",
};

const ReportDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box p={5}>
      <Button mb={5} onClick={() => navigate("/admin/report")}>
        Back
      </Button>
      <VStack align="start" spacing={4}>
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Customer Details
          </Text>
          <Text>Customer Name: {reportDetails.customerName}</Text>
          <Text>NID: {reportDetails.nid}</Text>
          <Text>Phone Number: {reportDetails.phoneNumber}</Text>
          <Text>Email: {reportDetails.email}</Text>
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Service Details
          </Text>
          <Text>Service Name: {reportDetails.serviceName}</Text>
          <Text>Description: {reportDetails.description}</Text>
          <Text>Fees: ${reportDetails.fees}</Text>
          <Text>Date From: {reportDetails.dateFrom}</Text>
          <Text>Date To: {reportDetails.dateTo}</Text>
          <Text>Time From: {reportDetails.timeFrom}</Text>
          <Text>Time To: {reportDetails.timeTo}</Text>
          <Text>Reserve Date: {reportDetails.reserveDate}</Text>
          <Text>Reserve Time: {reportDetails.reserveTime}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default ReportDetails;
