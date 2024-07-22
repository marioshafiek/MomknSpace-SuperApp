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
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

interface ProviderFormData {
  spEnglishName: string;
  spArabicName: string;
  active: boolean;
  categoryId: string;
}

interface Category {
  _id: string;
  categoryEnglishName: string;
}

interface ProvidersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProviderFormData) => void;
  initialData?: ProviderFormData | null; // Add initialData prop
}

const ProvidersModal: React.FC<ProvidersModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = null, // Default to null if not provided
}) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<ProviderFormData>({
      defaultValues: {
        spEnglishName: "",
        spArabicName: "",
        active: true,
        categoryId: "",
      },
    });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const activeStatus = watch("active");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://superapp-production.up.railway.app/getAllServiceCategories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setValue("spEnglishName", initialData.spEnglishName);
      setValue("spArabicName", initialData.spArabicName);
      setValue("active", initialData.active);
      setValue("categoryId", initialData.categoryId);
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: ProviderFormData) => {
    try {
      setIsLoading(true);
      const url = initialData
        ? "https://superapp-production.up.railway.app/updateServiceProvider"
        : "https://superapp-production.up.railway.app/createServiceProvider";
      const method = initialData ? "PUT" : "POST";

      const payload = {
        ...data,
        id: initialData ? initialData.categoryId : undefined,
      };
      console.log(payload);
      const response = await axios({
        method,
        url,
        data: payload,
      });
      console.log(response.data.message);

      Swal.fire({
        title: "Success",
        text: `Service provider ${
          initialData ? "updated" : "added"
        } successfully.`,
        icon: "success",
        confirmButtonText: "OK",
      });

      onSave(data);
      onClose();
      reset();
    } catch (error) {
      console.error("Error saving service provider:", error);
      Swal.fire({
        title: "Error",
        text: `There was an error ${
          initialData ? "updating" : "adding"
        } the service provider.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? "Edit Service Provider" : "Add Service Provider"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Provider English Name</FormLabel>
                <Controller
                  name="spEnglishName"
                  control={control}
                  rules={{ required: "English name is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input {...field} />
                      {fieldState.error && (
                        <Text color="red.500" fontSize="sm">
                          {fieldState.error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Provider Arabic Name</FormLabel>
                <Controller
                  name="spArabicName"
                  control={control}
                  rules={{ required: "Arabic name is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input {...field} />
                      {fieldState.error && (
                        <Text color="red.500" fontSize="sm">
                          {fieldState.error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Select placeholder="Select category" {...field}>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.categoryEnglishName}
                          </option>
                        ))}
                      </Select>
                      {fieldState.error && (
                        <Text color="red.500" fontSize="sm">
                          {fieldState.error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Active</FormLabel>
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <HStack>
                      <Button
                        variant={activeStatus ? "solid" : "outline"}
                        colorScheme={activeStatus ? "green" : "gray"}
                        onClick={() => setValue("active", true)}
                      >
                        Active
                      </Button>
                      <Button
                        variant={!activeStatus ? "solid" : "outline"}
                        colorScheme={!activeStatus ? "red" : "gray"}
                        onClick={() => setValue("active", false)}
                      >
                        Inactive
                      </Button>
                    </HStack>
                  )}
                />
              </FormControl>
            </VStack>
            <ModalFooter>
              <Button colorScheme="green" type="submit" isLoading={isLoading}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProvidersModal;
