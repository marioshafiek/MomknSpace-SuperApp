import React, { useState, useEffect } from "react";
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
  Image,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import axios from "axios";
import { Category } from "../../types";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: Category | null; // Add initialData prop
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = null, // Default to null if not provided
}) => {
  const [categoryData, setCategoryData] = useState({
    image: null as File | null,
    imageUrl: "", // Add imageUrl to the state
    englishName: "",
    arabicName: "",
    active: true,
    id: "", // Add id to the state
  });

  useEffect(() => {
    if (initialData) {
      setCategoryData({
        image: null,
        imageUrl: initialData.image || "", // Set imageUrl from initialData
        englishName: initialData.category,
        arabicName: initialData.categoryArabicName,
        active: initialData.status === "active",
        id: initialData.id, // Set id from initialData
      });
    }
  }, [initialData]);

  const resetModal = () => {
    setCategoryData({
      image: null,
      imageUrl: "",
      englishName: "",
      arabicName: "",
      active: true,
      id: "",
    });
  };

  const handleSave = async () => {
    const data = {
      categoryEnglishName: categoryData.englishName,
      categoryArabicName: categoryData.arabicName,
      active: categoryData.active,
      id: categoryData.id,
    };

    try {
      const response = await axios.put(
        "https://superapp-production.up.railway.app/updateServiceCategories",
        {
          data: {
            categoryEnglishName: data.categoryEnglishName,
            _id: data.id,
            categoryArabicName: categoryData.arabicName,
            active: categoryData.active,
          },
        }
      );
      console.log(data);

      if (response) {
        console.log(response);
        Swal.fire({
          title: "Success",
          text: "Category updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        onSave(); // Trigger the onSave function to refresh the categories list
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an error updating the category",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error updating the category",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error updating category", error);
    } finally {
      resetModal();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Service Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {categoryData.imageUrl && (
              <Image
                src={categoryData.imageUrl}
                alt="Category Image"
                boxSize="150px"
                objectFit="cover"
                mb={4}
              />
            )}
            <FormControl>
              <FormLabel>Add Image</FormLabel>
              <Input
                type="file"
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    image: e.target.files?.[0] || null,
                    imageUrl: e.target.files?.[0]
                      ? URL.createObjectURL(e.target.files[0])
                      : categoryData.imageUrl, // Update imageUrl
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Service Category English Name</FormLabel>
              <Input
                value={categoryData.englishName}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    englishName: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Service Category Arabic Name</FormLabel>
              <Input
                value={categoryData.arabicName}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    arabicName: e.target.value,
                  })
                }
              />
            </FormControl>
            <HStack spacing={4}>
              <Button
                variant="solid"
                colorScheme={categoryData.active ? "green" : "gray"}
                onClick={() =>
                  setCategoryData({ ...categoryData, active: true })
                }
              >
                Active
              </Button>
              <Button
                variant="solid"
                colorScheme={!categoryData.active ? "red" : "gray"}
                onClick={() =>
                  setCategoryData({ ...categoryData, active: false })
                }
              >
                Inactive
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button bg={"#06B479"} color={"white"} onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCategoryModal;
