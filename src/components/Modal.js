import styled from "styled-components";
import tw from "twin.macro";

const StyledModal = styled.div`
  ${tw`flex items-center justify-center fixed z-50 inset-0 w-full min-h-screen bg-black/75`}
`;

export default function Modal({ children }) {
  return <StyledModal>{children}</StyledModal>;
}
