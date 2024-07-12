// Header.tsx
import React from "react";
import { Box, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import SearchBar from "../header/SearchBar";
import UserHeader from "../header/UserHeader";
import { useAuth } from "../../../contexts/AuthContext";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userName } = useAuth();

  return (
    <Box bg="#FFFFFF" px={4} boxShadow="md">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <SearchBar />
        </HStack>
        <Flex alignItems={"center"} pr={10}>
          <UserHeader
            name={userName == null ? "useradmin" : userName}
            image="https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134160.jpg?t=st=1720725444~exp=1720729044~hmac=59e2c1f36aa16537e54b7ff40bc170c2b6b8d1e3571975b2b76f2429e40f0f30&w=1800"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
