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
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

interface MultiStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const CateogryModal: React.FC<MultiStepModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [categoryData, setCategoryData] = useState({
    image: null as File | null,
    englishName: "",
    arabicName: "",
    active: true,
  });

  const resetModal = () => {
    setCategoryData({
      image: null,
      englishName: "",
      arabicName: "",
      active: true,
    });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("categoryEnglishName", categoryData.englishName);
    formData.append("categoryArabicName", categoryData.arabicName);
    formData.append("active", categoryData.active.toString());
    if (categoryData.image) {
      formData.append("image", categoryData.image);
    }

    try {
      const response = await fetch(
        "https://superapp-production.up.railway.app/createServiceCategory",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: "Category added successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        onSave(); // Trigger the onSave function to refresh the categories list
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an error adding the category",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error adding the category",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error adding category", error);
    } finally {
      resetModal();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Service Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Add Image</FormLabel>
              <Input
                type="file"
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    image: e.target.files?.[0] || null,
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

export default CateogryModal;
