import { Box, Flex, FlexProps, Icon, Link } from "@chakra-ui/react";
import React, { ReactText } from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  location: string;
}

const SideItem = ({ icon, children, location, ...rest }: NavItemProps) => {
  return (
    <Link href={location} style={{ textDecoration: "none" }}>
      <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          color="##7B8A92"
          _hover={{
            bg: "#06B47933",
            color: "#06B479",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "#06B479",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

export default SideItem;
