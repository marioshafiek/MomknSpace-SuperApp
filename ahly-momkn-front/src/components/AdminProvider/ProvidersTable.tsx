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
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TableProps {
  data: any[];
  columns: string[];
  onEdit: (provider: any) => void;
  onDelete: (id: string) => void;
}

const ProvidersTable: React.FC<TableProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
}) => {
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
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Edit Provider"
                    icon={<FaEdit />}
                    onClick={() => onEdit(row)}
                  />
                  <IconButton
                    aria-label="Delete Provider"
                    icon={<FaTrash />}
                    onClick={() => onDelete(row._id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProvidersTable;
