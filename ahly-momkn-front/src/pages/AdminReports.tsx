import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ReportTable from "@components/AdminReport/ReportTable";

const AdminReport: React.FC = () => {
  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        Reports
      </Text>
      <Box bg="white" p={5} rounded="lg" boxShadow="md" overflowX="auto">
        <ReportTable />
      </Box>
    </Box>
  );
};

export default AdminReport;
