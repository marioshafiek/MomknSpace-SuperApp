import React from "react";
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
  Textarea,
  VStack,
  HStack,
  Select,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MdAttachMoney } from "react-icons/md";
import Swal from "sweetalert2";

const serviceSchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
  provider: z.string().min(1, { message: "Provider is required" }),
  name: z.string().min(1, { message: "Service name is required" }),
  description: z
    .string()
    .min(1, { message: "Service description is required" }),
  fees: z.string(),
  code: z.string().min(1, { message: "Code is required" }),
  active: z.boolean(),
  type: z.string().min(1, { message: "Service type is required" }),
  from: z.string().optional(),
  to: z.string().optional(),
  image: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Image is required",
  }),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  providers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

const ServicesModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose,
  onSave,
  providers,
  categories,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    mode: "onChange",
  });

  const type = watch("type");

  const formatDateTime = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split(".")[0] + "Z";
  };

  const onSubmit = async (data: ServiceFormData) => {
    const selectedProvider = providers.find(
      (provider) => provider.id === data.provider
    );
    const selectedCategory = categories.find(
      (category) => category.id === data.category
    );

    if (!selectedProvider || !selectedCategory) {
      console.error("Provider or Category not found");
      return;
    }

    const formData = new FormData();
    formData.append("providerId", selectedProvider.id);
    formData.append("categoryId", selectedCategory.id);
    formData.append("name", data.name);
    formData.append("fees", data.fees);
    formData.append("code", data.code);
    formData.append("description", data.description);
    if (data.type != "non-scheduled") {
      formData.append("type", data.type);
    }

    formData.append("state", data.active ? "active" : "locked");
    if (data.type === "scheduled") {
      formData.append("from", formatDateTime(data.from));
      formData.append("to", formatDateTime(data.to));
    } else {
      // Omit 'from' and 'to' from the form data if not scheduled or empty values
      formData.delete("from");
      formData.delete("to");
    }
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await axios.post(
        "https://superapp-production.up.railway.app/addServices",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Service added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        onSave(); // Trigger the onSave function to refresh the services list
        reset();
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an error adding the service.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error adding the service.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error adding service", error);
    } finally {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={!!errors.category}>
                <FormLabel>Select Category</FormLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="Select category" {...field}>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                {errors.category && (
                  <Text color="red.500">{errors.category.message}</Text>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.provider}>
                <FormLabel>Select Provider</FormLabel>
                <Controller
                  name="provider"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="Select provider" {...field}>
                      {providers.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                {errors.provider && (
                  <Text color="red.500">{errors.provider.message}</Text>
                )}
              </FormControl>
              <HStack>
                <FormControl isInvalid={!!errors.image}>
                  <FormLabel>Add Image</FormLabel>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setValue("image", e.target.files as FileList)
                        }
                      />
                    )}
                  />
                  {errors.image && (
                    <Text color="red.500">{errors.image.message}</Text>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Service Name</FormLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.name && (
                    <Text color="red.500">{errors.name.message}</Text>
                  )}
                </FormControl>
              </HStack>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Service Description</FormLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <Textarea {...field} />}
                />
                {errors.description && (
                  <Text color="red.500">{errors.description.message}</Text>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.fees}>
                <FormLabel>Service Fees</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdAttachMoney color="gray.300" />
                  </InputLeftElement>
                  <Controller
                    name="fees"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" paddingLeft="2.5rem" {...field} />
                    )}
                  />
                </InputGroup>
                {errors.fees && (
                  <Text color="red.500">{errors.fees.message}</Text>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.code}>
                <FormLabel>Service Code</FormLabel>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.code && (
                  <Text color="red.500">{errors.code.message}</Text>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.type}>
                <FormLabel>Service Type</FormLabel>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="Select type" {...field}>
                      <option value="scheduled">Scheduled</option>
                      <option value="not_scheduled">Non-Scheduled</option>
                      <option value="agent">Agent</option>
                    </Select>
                  )}
                />
                {errors.type && (
                  <Text color="red.500">{errors.type.message}</Text>
                )}
              </FormControl>
              {type === "scheduled" && (
                <>
                  <FormControl>
                    <FormLabel>From Date</FormLabel>
                    <Controller
                      name="from"
                      control={control}
                      render={({ field }) => <Input type="date" {...field} />}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>To Date</FormLabel>
                    <Controller
                      name="to"
                      control={control}
                      render={({ field }) => <Input type="date" {...field} />}
                    />
                  </FormControl>
                </>
              )}
              <HStack spacing={4}>
                <Controller
                  name="active"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => (
                    <>
                      <Button
                        variant="solid"
                        colorScheme={field.value ? "green" : "gray"}
                        onClick={() => field.onChange(true)}
                      >
                        Active
                      </Button>
                      <Button
                        variant="solid"
                        colorScheme={!field.value ? "red" : "gray"}
                        onClick={() => field.onChange(false)}
                      >
                        Locked
                      </Button>
                    </>
                  )}
                />
              </HStack>
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
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServicesModal;
