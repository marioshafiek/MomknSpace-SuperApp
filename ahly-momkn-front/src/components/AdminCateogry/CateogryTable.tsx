import React from "react";
import {
  Box,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
  Image,
  HStack,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { Category } from "../../types";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TableProps {
  data: Category[];
  columns: string[];
  onDelete: (id: string) => void;
  onEdit: (category: Category) => void;
}

const Table: React.FC<TableProps> = ({ data, columns, onDelete, onEdit }) => {
  return (
    <TableContainer>
      <ChakraTable variant="simple">
        <TableCaption>Categories</TableCaption>
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>
                <HStack spacing={3}>
                  <Image
                    boxSize="30px"
                    objectFit="cover"
                    src={item.image}
                    alt={item.category}
                    borderRadius="full"
                  />
                  <Box>{item.category}</Box>
                </HStack>
              </Td>
              <Td>{item.categoryArabicName}</Td>
              <Td>{item.numberOfProviders}</Td>
              <Td>{item.numberOfServices}</Td>
              <Td>
                <Badge colorScheme={item.status === "active" ? "green" : "red"}>
                  {item.status}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Edit Category"
                    icon={<FaEdit />}
                    onClick={() => onEdit(item)}
                  />
                  <IconButton
                    aria-label="Delete Category"
                    icon={<FaTrash />}
                    onClick={() => onDelete(item.id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;
