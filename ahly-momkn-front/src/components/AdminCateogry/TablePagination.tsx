import React from "react";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TablePagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <ButtonGroup>
        <Button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => onPageChange(index + 1)}
            bg={currentPage === index + 1 ? "#06B479" : "white"}
          >
            {index + 1}
          </Button>
        ))}
        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default TablePagination;
