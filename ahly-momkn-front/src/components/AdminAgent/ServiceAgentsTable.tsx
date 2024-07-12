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
} from "@chakra-ui/react";

interface Props {
  data: any[];
  columns: string[];
}

const ServiceAgentsTable: React.FC<Props> = ({ data, columns }) => {
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
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ServiceAgentsTable;
