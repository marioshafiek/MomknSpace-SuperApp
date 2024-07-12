// UserHeader.tsx
import {
  Avatar,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface UserHeaderProps {
  name: string;
  image: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, image }) => {
  return (
    <Flex alignItems="center">
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar size={"sm"} src={image} />
        </MenuButton>
        <MenuList>
          <Link href="/profile">
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link href="/settings">
            <MenuItem>Settings</MenuItem>
          </Link>
          <MenuDivider />
          <Link href="/login">
            <MenuItem>Logout</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <Text p={2} color="#4D4D4D">
        {name}
      </Text>
    </Flex>
  );
};

export default UserHeader;
