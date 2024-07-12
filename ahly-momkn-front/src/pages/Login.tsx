import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust the path to your logo image

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const toast = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data: LoginFormData) => {
    const success = login(data.email, data.password);
    if (success) {
      toast({
        title: "Login successful",
        description: "You have been logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/", { replace: true });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.100"
    >
      <Box w="400px" p="8" bg="white" boxShadow="lg" rounded="lg">
        <Box textAlign="center" mb="6">
          <Image src={logo} alt="Logo" mx="auto" mb="4" />
          <Text fontSize="2xl">Login</Text>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="4">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input type="email" {...field} />}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input type="password" {...field} />}
              />
              {errors.password && (
                <Text color="red.500">{errors.password.message}</Text>
              )}
            </FormControl>
            <Button
              type="submit"
              bg="#06B479"
              color={"white"}
              isDisabled={!isValid}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
