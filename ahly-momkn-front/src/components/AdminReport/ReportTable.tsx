import React, { useState } from "react";
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
  id: number;
  customerName: string;
  service: string;
  reserveDate: string;
  fees: number;
}

const initialData: ReportData[] = [
  {
    id: 1,
    customerName: "John Doe",
    service: "Cleaning",
    reserveDate: "2024-08-01",
    fees: 50,
  },
  {
    id: 2,
    customerName: "Jane Smith",
    service: "Plumbing",
    reserveDate: "2024-08-02",
    fees: 75,
  },
  {
    id: 3,
    customerName: "Alice Johnson",
    service: "Electrician",
    reserveDate: "2024-08-03",
    fees: 100,
  },
  {
    id: 4,
    customerName: "Bob Brown",
    service: "Gardening",
    reserveDate: "2024-08-04",
    fees: 60,
  },
  {
    id: 5,
    customerName: "Charlie Davis",
    service: "Car Wash",
    reserveDate: "2024-08-05",
    fees: 40,
  },
  {
    id: 6,
    customerName: "Diana Evans",
    service: "Dog Walking",
    reserveDate: "2024-08-06",
    fees: 30,
  },
  {
    id: 7,
    customerName: "Edward Frank",
    service: "Window Cleaning",
    reserveDate: "2024-08-07",
    fees: 70,
  },
  {
    id: 8,
    customerName: "Fiona Green",
    service: "House Cleaning",
    reserveDate: "2024-08-08",
    fees: 90,
  },
  {
    id: 9,
    customerName: "George Hill",
    service: "Painting",
    reserveDate: "2024-08-09",
    fees: 110,
  },
  {
    id: 10,
    customerName: "Hannah Irvine",
    service: "Tutoring",
    reserveDate: "2024-08-10",
    fees: 50,
  },
];

const ReportTable: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const navigate = useNavigate();

  const handleConfirm = (id: number) => {
    setData(data.filter((item) => item.id !== id));
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
            <Th>Service</Th>
            <Th>Reserve Date</Th>
            <Th>Fees</Th>
            <Th>Confirm Service</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentData.map((row) => (
            <Tr key={row.id}>
              <Td>{row.customerName}</Td>
              <Td>{row.service}</Td>
              <Td>{row.reserveDate}</Td>
              <Td>${row.fees}</Td>
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
                  onClick={() => navigate(`admin/reports/details`)}
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
