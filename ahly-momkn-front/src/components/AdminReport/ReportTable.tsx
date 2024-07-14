import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Link,
} from "@chakra-ui/react";
import TablePagination from "../AdminCateogry/TablePagination"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

interface ReportData {
  id: string;
  customerName: string;
  phoneNumber: string;
  service: string;
  serviceDescription: string;
  serviceFees: number;
  categoryId: string;
  providerId: string;
  reserveDate: string;
  reserveTime: string;
  serviceFrom: string;
  serviceTo: string;
}

interface ReportTableProps {
  data: ReportData[];
  onRemoveBooking: (id: string) => void;
}

const ReportTable: React.FC<ReportTableProps> = ({ data, onRemoveBooking }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const navigate = useNavigate();

  const handleConfirm = (id: string) => {
    onRemoveBooking(id);
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Customer Name</Th>
            <Th>Phone Number</Th>
            <Th>Service</Th>
            <Th>Reserve Date</Th>
            <Th>Reserve Time</Th>
            <Th>Fees</Th>
            <Th>Confirm Service</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentData.map((row) => (
            <Tr key={row.id}>
              <Td>{row.customerName}</Td>
              <Td>{row.phoneNumber}</Td>
              <Td>{row.service}</Td>
              <Td>{row.reserveDate}</Td>
              <Td>{row.reserveTime}</Td>
              <Td>${row.serviceFees}</Td>
              <Td>
                <Button
                  bg="#06B479"
                  color={"white"}
                  onClick={() => handleConfirm(row.id)}
                >
                  Done
                </Button>
              </Td>
              <Td>
                <Link
                  color="#06B479"
                  onClick={() =>
                    navigate(`/admin/report/details/${row.id}`, {
                      state: { ...row },
                    })
                  }
                >
                  See More
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <TablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
};

export default ReportTable;
