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
import { loginSession } from "../services/login_service";

export default function Login() {
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function newSession(data) {
    const userData = await loginSession(data);
    if (userData.hasOwnProperty("errors")) {
      alert(userData.errors);
    } else {
      localStorage.setItem("token", userData.token);
      navigate("/Categories");
    }
  }

  return (
    <StyledBody>
      <StyledContainer>
        <StyledTitle>Login</StyledTitle>
        <StyledFormContainer
          onSubmit={handleSubmit((data) => {
            newSession(data);
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
          <StyledFormButton type="submit">LOGIN</StyledFormButton>
        </StyledFormContainer>
        <StyledFormLink to="/SignUp">Sign Up</StyledFormLink>
      </StyledContainer>
    </StyledBody>
  );
}
