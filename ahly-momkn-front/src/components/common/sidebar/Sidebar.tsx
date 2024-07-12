import React, { ReactNode } from "react";
import logo from "@assets/Logo.svg";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { CiShoppingBasket, CiLogout } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TfiGame } from "react-icons/tfi";
import { FaRegFileLines } from "react-icons/fa6";
import { RiShapesFill } from "react-icons/ri";
import { PiHandCoinsThin } from "react-icons/pi";
import { RiCustomerService2Line } from "react-icons/ri";
import { CiBookmarkPlus } from "react-icons/ci";

import { IconType } from "react-icons";
import { ReactText } from "react";
import { Link, NavLink } from "react-router-dom";

import SideItem from "../sidebar/SideItem";
import { useAuth } from "../../../contexts/AuthContext"; // Import useAuth

interface LinkItemProps {
  name: string;
  icon: IconType;
  location: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Booking", icon: CiBookmarkPlus, location: "/category" },
  { name: "Category", icon: RiShapesFill, location: "/admin/category" },
  {
    name: "Service Provider",
    icon: PiHandCoinsThin,
    location: "/admin/providers",
  },
  {
    name: "Services",
    icon: IoIosNotificationsOutline,
    location: "/admin/services",
  },

  {
    name: "Service Agent",
    icon: RiCustomerService2Line,
    location: "/admin/agent",
  },
  { name: "Reports", icon: FaRegFileLines, location: "/admin/reports" },
];

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth(); // Use useAuth to get the logout function

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        logout={logout} // Pass logout function to SidebarContent
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} logout={logout} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  logout: () => void; // Add logout prop
}

const SidebarContent = ({ onClose, logout, ...rest }: SidebarProps) => {
  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Box>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Link to="Home">
            <Image src={logo} alt="Logo" />
          </Link>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <SideItem key={link.name} icon={link.icon} location={link.location}>
            {link.name}
          </SideItem>
        ))}
      </Box>
      <Box mb="4" mx="5" pl="5" position="absolute" bottom="5">
        <Box mb="4" mx="5" position="absolute" bottom="0">
          <Button
            leftIcon={<CiLogout />}
            bg="white"
            variant="solid"
            onClick={logout} // Handle logout on button click
            _hover={{
              bg: "#06B47933",
              color: "#06B479",
            }}
          >
            LogOut
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
