import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  FormInput,
  StyledContainer,
  StyledError,
  StyledFormButton,
  StyledFormContainer,
  StyledFormLink,
  StyledTitle,
} from "../components/FormItems";
import { StyledBody } from "../components/Page";
import { userSignUp } from "../services/user_service";

export default function SignUp() {
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
    },
  });

  async function newUserSession(data) {
    const userData = await userSignUp(data);
    if (userData.status === "error") {
      alert(userData.message);
    } else {
      localStorage.setItem("token", userData.token);
      navigate("/Categories");
    }
  }

  return (
    <StyledBody>
      <StyledContainer>
        <StyledTitle>Sign Up</StyledTitle>
        <StyledFormContainer
          onSubmit={handleSubmit((data) => {
            newUserSession(data);
          })}
        >
          <FormInput
            label="email"
            placeholder="example@mail.com"
            {...register("email", {
              required: "This is required",
              pattern: {
                value:
                  /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                message: "Valid email format only",
              },
            })}
          />
          <StyledError>{errors.email?.message}</StyledError>
          <FormInput
            label="password"
            placeholder="******"
            type="password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 6, message: "Min length of 6 chars" },
            })}
          />
          <StyledError>{errors.password?.message}</StyledError>
          <FormInput
            label="first name"
            placeholder="John"
            {...register("first_name", {
              required: "This is required",
              pattern: { value: /^[a-zA-Z]+$/, message: "Letters only" },
            })}
          />
          <StyledError>{errors.first_name?.message}</StyledError>
          <FormInput
            label="last name"
            placeholder="Doe"
            {...register("last_name", {
              required: "This is required",
              pattern: { value: /^[a-zA-Z]+$/, message: "Letters only" },
            })}
          />
          <StyledError>{errors.last_name?.message}</StyledError>
          <FormInput
            label="phone"
            placeholder="987654321"
            {...register("phone", {
              required: "This is required",
              pattern: {
                value: /(\+?\d{2})?\s?\d{9}/,
                message: "Only numbers",
              },
              maxLength: {
                value: 9,
                message: "Only 9 digits",
              },
            })}
          />
          <StyledError>{errors.phone?.message}</StyledError>
          <StyledFormButton type="submit">SIGN UP</StyledFormButton>
        </StyledFormContainer>
        <StyledFormLink to="/Login">Login</StyledFormLink>
      </StyledContainer>
    </StyledBody>
  );
}
