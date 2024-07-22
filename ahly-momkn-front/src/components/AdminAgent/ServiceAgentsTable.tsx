import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  TableCaption,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

interface Props {
  data: any[];
  columns: string[];
  onDelete: (id: string) => void;
}

const ServiceAgentsTable: React.FC<Props> = ({ data, columns, onDelete }) => {
  return (
    <Table variant="simple">
      <TableCaption>Service Agent</TableCaption>
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th key={column}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row) => (
          <Tr key={row._id}>
            <Td>{row.agentEnglishName}</Td>
            <Td>{row.agentArabicName}</Td>
            <Td>{row.serviceName}</Td>
            <Td>
              <Badge colorScheme={row.isVisible ? "green" : "red"}>
                {row.isVisible ? "Yes" : "No"}
              </Badge>
            </Td>
            <Td>{row.serviceAgentfees}</Td>
            <Td>
              <Badge colorScheme={row.hasCalendar ? "green" : "red"}>
                {row.hasCalendar ? "Yes" : "No"}
              </Badge>
            </Td>
            <Td>
              <Badge colorScheme={row.state === "active" ? "green" : "red"}>
                {row.state}
              </Badge>
            </Td>
            <Td>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Delete agent"
                  icon={<FaTrash />}
                  onClick={() => onDelete(row._id)}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ServiceAgentsTable;
