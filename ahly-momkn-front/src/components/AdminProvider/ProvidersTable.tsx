import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Badge,
  TableCaption,
} from "@chakra-ui/react";

interface TableProps {
  data: any[];
  columns: string[];
}

const ProvidersTable: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <TableCaption>Service Providers</TableCaption>
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              <Td>{row.spEnglishName}</Td>
              <Td>{row.spArabicName}</Td>
              <Td>{row.categoryName}</Td>
              <Td>
                <Badge colorScheme={row.active === true ? "green" : "red"}>
                  {row.active === true ? "Active" : "Inactive"}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProvidersTable;
