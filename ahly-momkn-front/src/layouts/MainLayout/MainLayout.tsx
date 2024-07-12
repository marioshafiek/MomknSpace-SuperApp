import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "@components/common/sidebar/Sidebar";
import Header from "@components/common/header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Grid
        templateAreas={`"nav header"
                        "nav main"`}
        gridTemplateRows={"60px 1fr"} // Adjusted to give the header more space
        gridTemplateColumns={"240px 1fr"}
        h="100vh" // Ensure the grid covers the full viewport height
        gap="0"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="#FFFFFF" area={"header"}>
          <Header />
        </GridItem>
        <GridItem pl="2" bg="#FFFFFF" area={"nav"}>
          <Sidebar /> 
        </GridItem>
        <GridItem pl="2" bg="#F3F6F9" area={"main"}>
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default MainLayout;
