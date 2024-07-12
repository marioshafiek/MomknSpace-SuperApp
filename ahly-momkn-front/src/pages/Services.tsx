import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ServiceCard from "@components/Services/ServiceCard"; // Adjust the import path as needed
import Header from "@components/ServiceHeader"; // Adjust the import path as needed

const serviceData = [
  {
    title: "Premium Cleaning",
    badgeText: "Popular",
    description: "A thorough cleaning service for your home or office.",
    serviceFees: 120,
  },
  {
    title: "Lawn Mowing",
    badgeText: "New",
    description:
      "Professional lawn mowing services to keep your yard looking neat.",
    serviceFees: 60,
  },
  {
    title: "Car Wash",
    badgeText: "Best Seller",
    description: "Complete car wash service to keep your vehicle spotless.",
    serviceFees: 30,
  },
  {
    title: "Dog Walking",
    badgeText: "Friendly",
    description: "Daily dog walking services for your furry friends.",
    serviceFees: 40,
  },
];

const Services: React.FC = () => {
  const handleReserve = (
    serviceTitle: string,
    selectedTime: string,
    selectedDate: string
  ) => {
    // Replace this with your API call
    alert(
      `Service Reserved: ${serviceTitle}\nTime: ${selectedTime}\nDate: ${selectedDate}`
    );
  };

  return (
    <Box>
      <Header title="Services" />
      <SimpleGrid columns={[1, null, 2]} spacing={10}>
        {serviceData.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            badgeText={service.badgeText}
            description={service.description}
            serviceFees={service.serviceFees}
            onReserve={(selectedTime, selectedDate) =>
              handleReserve(service.title, selectedTime, selectedDate)
            }
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Services;
