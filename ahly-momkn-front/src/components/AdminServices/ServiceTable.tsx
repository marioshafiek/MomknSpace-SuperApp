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
  Image,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Service } from "../../types"; // Make sure this is correct

interface TableProps {
  data: Service[];
  columns: string[];
  onEdit: (service: Service) => void;
  onDelete: (serviceId: string) => void;
}

const ServicesTable: React.FC<TableProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
}) => {
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <TableCaption>Services</TableCaption>
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
              <Td>
                <Image
                  boxSize="30px"
                  objectFit="cover"
                  src={row.image}
                  alt={row.serviceName}
                  rounded="full"
                />
                <Box>{row.serviceName}</Box>
              </Td>
              <Td>{row.description}</Td>
              <Td>{row.provider}</Td>
              <Td>{row.category}</Td>
              <Td>{row.type}</Td>
              <Td>{row.fees}</Td>
              <Td>
                {row.from ? format(new Date(row.from), "yyyy-MM-dd") : "N/A"}
              </Td>
              <Td>{row.to ? format(new Date(row.to), "yyyy-MM-dd") : "N/A"}</Td>
              <Td>
                <Badge colorScheme={row.status === "active" ? "green" : "red"}>
                  {row.status}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Edit Service"
                    icon={<FaEdit />}
                    onClick={() => onEdit(row)}
                  />
                  <IconButton
                    aria-label="Delete Service"
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

export default ServicesTable;
