import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  serviceFees: number;
  type: string;
  onReserve: (selectedTime: string, selectedDate: string) => void;
}

const ReserveModal: React.FC<ReserveModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  serviceFees,
  type,
  onReserve,
}) => {
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const handleReserve = () => {
    onReserve(selectedTime || "", selectedDate || "");
    console.log(type);
    onClose();
  };

  const bgClosed = "#06B47933";
  const bgOpen = useColorModeValue("white", "gray.700");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reserve Service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion allowToggle>
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <Box
                    borderRadius="lg"
                    bg={isExpanded ? bgOpen : bgClosed}
                    _hover={{ bg: bgClosed }}
                    mb={4}
                    overflow="hidden"
                  >
                    <AccordionButton
                      p={4}
                      borderRadius="lg"
                      _expanded={{ bg: bgClosed }}
                    >
                      {isExpanded ? (
                        <MinusIcon fontSize="12px" mr={2} />
                      ) : (
                        <AddIcon fontSize="12px" mr={2} />
                      )}
                      <Box flex="1" textAlign="left">
                        Service Details
                      </Box>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Text fontWeight="bold">{title}</Text>
                      <Text>{description}</Text>
                      <Text>Price: ${serviceFees}</Text>
                    </AccordionPanel>
                  </Box>
                </>
              )}
            </AccordionItem>

            {type === "scheduled" && (
              <>
                <AccordionItem border="none">
                  {({ isExpanded }) => (
                    <>
                      <Box
                        borderRadius="lg"
                        bg={isExpanded ? bgOpen : bgClosed}
                        _hover={{ bg: bgClosed }}
                        mb={4}
                        overflow="hidden"
                      >
                        <AccordionButton
                          p={4}
                          borderRadius="lg"
                          _expanded={{ bg: bgClosed }}
                        >
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" mr={2} />
                          ) : (
                            <AddIcon fontSize="12px" mr={2} />
                          )}
                          <Box flex="1" textAlign="left">
                            Select Time
                          </Box>
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <Stack direction="row" spacing={4}>
                            {["10-12", "12-2", "2-4"].map((time) => (
                              <Button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                colorScheme={
                                  selectedTime === time ? "teal" : "gray"
                                }
                              >
                                {time}
                              </Button>
                            ))}
                          </Stack>
                        </AccordionPanel>
                      </Box>
                    </>
                  )}
                </AccordionItem>

                <AccordionItem border="none">
                  {({ isExpanded }) => (
                    <>
                      <Box
                        borderRadius="lg"
                        bg={isExpanded ? bgOpen : bgClosed}
                        _hover={{ bg: bgClosed }}
                        mb={4}
                        overflow="hidden"
                      >
                        <AccordionButton
                          p={4}
                          borderRadius="lg"
                          _expanded={{ bg: bgClosed }}
                        >
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" mr={2} />
                          ) : (
                            <AddIcon fontSize="12px" mr={2} />
                          )}
                          <Box flex="1" textAlign="left">
                            Select Date
                          </Box>
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <FormControl>
                            <FormLabel>Date</FormLabel>
                            <Input
                              type="date"
                              onChange={(e) => setSelectedDate(e.target.value)}
                            />
                          </FormControl>
                        </AccordionPanel>
                      </Box>
                    </>
                  )}
                </AccordionItem>
              </>
            )}
          </Accordion>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Discard
          </Button>
          <Button bg={"#06B479"} color={"white"} ml={3} onClick={handleReserve}>
            Reserve
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReserveModal;
