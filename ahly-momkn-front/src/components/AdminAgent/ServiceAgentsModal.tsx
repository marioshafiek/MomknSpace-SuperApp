import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  Select,
  InputGroup,
  InputLeftElement,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdAttachMoney } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

const agentSchema = z.object({
  agentEnglishName: z
    .string()
    .min(1, { message: "Agent English name is required" }),
  agentArabicName: z
    .string()
    .min(1, { message: "Agent Arabic name is required" }),
  serviceId: z.string().min(1, { message: "Service ID is required" }),
  serviceAgentfees: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Fees are required" })
  ),
  state: z.string().min(1, { message: "State is required" }),
  isVisible: z.boolean(),
  hasCalendar: z.boolean(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  hoursFrom: z.string().optional(),
  hoursTo: z.string().optional(),
  slots: z.number().optional(),
});

type AgentFormData = z.infer<typeof agentSchema>;

interface Service {
  _id: string;
  name: string;
}

interface ServiceAgentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AgentFormData) => void;
}

const ServiceAgentsModal: React.FC<ServiceAgentsModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
  });

  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasCalendar = watch("hasCalendar");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://superapp-production.up.railway.app/allServices"
        );
        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const onSubmit = async (data: AgentFormData) => {
    try {
      const response = await axios.post(
        "https://superapp-production.up.railway.app/createServiceAgent",
        {
          agentEnglishName: data.agentEnglishName,
          agentArabicName: data.agentArabicName,
          serviceId: data.serviceId,
          serviceAgentfees: data.serviceAgentfees,
          state: data.state,
          isVisible: data.isVisible,
          hasCalendar: data.hasCalendar,
        }
      );
      const serviceAgentId = response.data.data._id;

      if (data.hasCalendar) {
        await axios.post(
          "https://superapp-production.up.railway.app/createCallenderAgent",
          {
            fromDate: data.dateFrom,
            toDate: data.dateTo,
            fromHour: data.hoursFrom,
            toHour: data.hoursTo,
            slots: data.slots,
            serviceAgentId: serviceAgentId,
          }
        );
      }

      Swal.fire({
        title: "Success",
        text: "Service agent added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      onSave(data);
      onClose();
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error saving service agent:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error adding the service agent.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Service Agent</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={!!errors.agentEnglishName}>
                  <FormLabel>Agent English Name</FormLabel>
                  <Controller
                    name="agentEnglishName"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.agentEnglishName && (
                    <Text color="red.500">
                      {errors.agentEnglishName.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.agentArabicName}>
                  <FormLabel>Agent Arabic Name</FormLabel>
                  <Controller
                    name="agentArabicName"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.agentArabicName && (
                    <Text color="red.500">
                      {errors.agentArabicName.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.serviceId}>
                  <FormLabel>Service</FormLabel>
                  <Controller
                    name="serviceId"
                    control={control}
                    render={({ field }) => (
                      <Select placeholder="Select service" {...field}>
                        {services.map((service) => (
                          <option key={service._id} value={service._id}>
                            {service.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.serviceId && (
                    <Text color="red.500">{errors.serviceId.message}</Text>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.serviceAgentfees}>
                  <FormLabel>Service Fees</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <MdAttachMoney color="gray.300" />
                    </InputLeftElement>
                    <Controller
                      name="serviceAgentfees"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          paddingLeft="2.5rem"
                          {...field}
                          onChange={(e) =>
                            setValue(
                              "serviceAgentfees",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      )}
                    />
                  </InputGroup>
                  {errors.serviceAgentfees && (
                    <Text color="red.500">
                      {errors.serviceAgentfees.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <HStack>
                        <Button
                          variant="solid"
                          colorScheme={
                            field.value === "active" ? "green" : "gray"
                          }
                          onClick={() => field.onChange("active")}
                        >
                          Active
                        </Button>
                        <Button
                          variant="solid"
                          colorScheme={
                            field.value === "locked" ? "red" : "gray"
                          }
                          onClick={() => field.onChange("locked")}
                        >
                          Inactive
                        </Button>
                      </HStack>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Visibility</FormLabel>
                  <Controller
                    name="isVisible"
                    control={control}
                    render={({ field }) => (
                      <HStack>
                        <Button
                          variant="solid"
                          colorScheme={field.value ? "green" : "gray"}
                          onClick={() => field.onChange(true)}
                        >
                          Visible
                        </Button>
                        <Button
                          variant="solid"
                          colorScheme={!field.value ? "red" : "gray"}
                          onClick={() => field.onChange(false)}
                        >
                          Invisible
                        </Button>
                      </HStack>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Calendar</FormLabel>
                  <Controller
                    name="hasCalendar"
                    control={control}
                    render={({ field }) => (
                      <HStack>
                        <Button
                          variant="solid"
                          colorScheme={field.value ? "green" : "gray"}
                          onClick={() => field.onChange(true)}
                        >
                          Has Calendar
                        </Button>
                        <Button
                          variant="solid"
                          colorScheme={!field.value ? "red" : "gray"}
                          onClick={() => field.onChange(false)}
                        >
                          No Calendar
                        </Button>
                      </HStack>
                    )}
                  />
                </FormControl>
                {hasCalendar && (
                  <>
                    <FormControl isInvalid={!!errors.dateFrom}>
                      <FormLabel>Date From</FormLabel>
                      <Controller
                        name="dateFrom"
                        control={control}
                        render={({ field }) => <Input type="date" {...field} />}
                      />
                      {errors.dateFrom && (
                        <Text color="red.500">{errors.dateFrom.message}</Text>
                      )}
                    </FormControl>
                    <FormControl isInvalid={!!errors.dateTo}>
                      <FormLabel>Date To</FormLabel>
                      <Controller
                        name="dateTo"
                        control={control}
                        render={({ field }) => <Input type="date" {...field} />}
                      />
                      {errors.dateTo && (
                        <Text color="red.500">{errors.dateTo.message}</Text>
                      )}
                    </FormControl>
                    <FormControl isInvalid={!!errors.hoursFrom}>
                      <FormLabel>Hours From</FormLabel>
                      <Controller
                        name="hoursFrom"
                        control={control}
                        render={({ field }) => <Input type="time" {...field} />}
                      />
                      {errors.hoursFrom && (
                        <Text color="red.500">{errors.hoursFrom.message}</Text>
                      )}
                    </FormControl>
                    <FormControl isInvalid={!!errors.hoursTo}>
                      <FormLabel>Hours To</FormLabel>
                      <Controller
                        name="hoursTo"
                        control={control}
                        render={({ field }) => <Input type="time" {...field} />}
                      />
                      {errors.hoursTo && (
                        <Text color="red.500">{errors.hoursTo.message}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>Slots</FormLabel>
                      <Controller
                        name="slots"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              setValue("slots", parseFloat(e.target.value))
                            }
                          />
                        )}
                      />
                      {errors.slots && (
                        <Text color="red.500">{errors.slots.message}</Text>
                      )}
                    </FormControl>
                  </>
                )}
              </VStack>
              <ModalFooter>
                <Button
                  bg={"#06B479"}
                  color={"white"}
                  type="submit"
                  isDisabled={!isValid}
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServiceAgentsModal;
