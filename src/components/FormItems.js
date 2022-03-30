import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

export const StyledContainer = styled.div`
  ${tw`flex flex-col gap-8`}
`;

export const StyledFormContainer = styled.form`
  ${tw`flex flex-col gap-4`}
`;

export const StyledTitle = styled.h1`
  ${tw`text-3xl font-semibold text-center text-gray-900`}
`;

export const StyledFormButton = styled.button`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#F490B1")};
  ${tw`text-sm text-center text-white rounded-lg p-2`};
`;

export const StyledFormLink = styled(Link)`
  ${tw`text-sm text-center text-pink-500`}
`;

export const StyledError = styled.div`
  ${tw`text-sm text-red-500`}
`;

export const StyledInputContainer = styled.div`
  ${tw`w-full flex flex-col gap-1`}
`;

export const StyledFormLabel = styled.label`
  ${tw`text-xs text-gray-500`}
`;

const StyledFormInput = styled.input`
  ${tw`border-2 border-gray-200 rounded-lg py-3 px-2 text-base`}
`;

export const FormInput = React.forwardRef(
  ({ onChange, onBlur, name, label, placeholder, type }, ref) => (
    <StyledInputContainer>
      <StyledFormLabel>{label.toUpperCase()}</StyledFormLabel>
      <StyledFormInput
        placeholder={placeholder}
        type={type}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      />
    </StyledInputContainer>
  )
);
