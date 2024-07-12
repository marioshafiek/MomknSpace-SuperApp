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
} from "@chakra-ui/react";
import { Category } from "../../types"; // Define a Category type

interface TableProps {
  data: Category[];
  columns: string[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
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
                    borderRadius="full" // Make the image circular
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
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;
