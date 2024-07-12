import React from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  link?: string; // If link is provided, it uses Link to navigate, otherwise use navigate
}

const Header: React.FC<HeaderProps> = ({ title, link }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // This navigates to the previous page
  };

  return (
    <Flex align="center" mb={5}>
      {link ? (
        <Link to={link}>
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Back"
            bg={"white"}
            mr={3}
          />
        </Link>
      ) : (
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Back"
          bg={"white"}
          mr={3}
          onClick={handleBackClick}
        />
      )}
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
    </Flex>
  );
};

export default Header;
