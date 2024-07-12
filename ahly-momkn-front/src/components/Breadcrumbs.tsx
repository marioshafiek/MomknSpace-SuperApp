import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface BreadcrumbsProps {
  paths: { name: string; path: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
  return (
    <Box mb={4}>
      <Breadcrumb>
        {paths.map((pathItem, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink as={Link} to={pathItem.path}>
              {pathItem.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Box>
  );
};

export default Breadcrumbs;
