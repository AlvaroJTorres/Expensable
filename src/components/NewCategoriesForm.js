import { useForm } from "react-hook-form";
import { FILLICONS, ICONS, STYLES } from "../app/config";
import {
  FormInput,
  StyledFormContainer,
  StyledFormButton,
  StyledFormLabel,
  StyledError,
} from "./FormItems";
import { newCategory } from "../services/categories_service";
import styled from "styled-components";
import tw from "twin.macro";

const StyledModalContainer = styled.div`
  ${tw`flex flex-col bg-white w-2/5 p-4`}
`;

const StyledInputGrid = styled.div`
  ${tw`grid grid-cols-4 gap-6`}
`;

const StyledColorInput = styled.div`
  background-color: ${(props) => STYLES[props.inputColor]};
  ${tw`w-10 h-10 rounded-full`}
`;

const StyledIconInput = styled.div`
  ${tw`w-10 h-10 rounded-full hover:bg-gray-500`}
`;

export default function NewCategoriesForm({ dispatch, type }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      transaction_type: "",
      user_id: "",
      color: "",
      icon: "",
    },
  });

  async function setNewCategory(data) {
    const token = localStorage.getItem("token");
    data.user_id = +localStorage.getItem("userId");
    data.transaction_type = type;
    const categoryData = await newCategory(token, data);
    if (categoryData.status === "error") {
      alert(categoryData.message);
    } else {
      dispatch({ type: "closed" });
      window.location.reload();
    }
  }

  return (
    <StyledModalContainer>
      <div className="flex justify-between">
        <h1>New Category</h1>
        <button onClick={() => dispatch({ type: "closed" })}>X</button>
      </div>
      <StyledFormContainer
        onSubmit={handleSubmit((data) => {
          setNewCategory(data);
        })}
      >
        <FormInput
          label="name"
          {...register("name", { required: "Category must have a name" })}
        />
        <StyledError>{errors.name?.message}</StyledError>
        <div>
          <StyledFormLabel>COLOR</StyledFormLabel>
          <StyledInputGrid>
            {Object.keys(STYLES).map((color) => (
              <StyledColorInput key={color} inputColor={color}>
                <input
                  {...register("color")}
                  type="radio"
                  value={color}
                  name="color"
                />
              </StyledColorInput>
            ))}
          </StyledInputGrid>
        </div>
        <div>
          <StyledFormLabel>ICON</StyledFormLabel>
          <StyledInputGrid>
            {Object.keys(ICONS).map((icon) => (
              <StyledIconInput key={icon}>
                {FILLICONS[icon]}
                <input
                  {...register("icon")}
                  key={icon}
                  type="radio"
                  value={icon}
                  name="icon"
                />
              </StyledIconInput>
            ))}
          </StyledInputGrid>
        </div>
        <StyledFormButton type="submit" bgColor={"#DB2777"}>
          Create
        </StyledFormButton>
      </StyledFormContainer>
    </StyledModalContainer>
  );
}
