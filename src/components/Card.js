import styled from "styled-components";
import tw from "twin.macro";
import { ICONS, STYLES } from "../app/config";

const StyledCardContainer = styled.div`
  border-color: ${(props) => STYLES[props.inputColor]};
  ${tw`flex items-center border-2 rounded-lg p-4 gap-4`}
`;

export const StyledIcon = styled.div`
  background-color: ${(props) => STYLES[props.inputColor]};
  ${tw`border rounded-full p-3`}
`;

const StyledCategoryInfo = styled.div`
  ${tw`flex flex-col`}
`;

const StyledCategoryName = styled.div`
  ${tw`text-sm text-gray-500`}
`;

const StyledCategoryAmount = styled.div`
  ${tw`text-2xl text-gray-900`}
`;

export function Card({ color, icon, name, amount, children, onClick }) {
  return (
    <StyledCardContainer inputColor={color} onClick={onClick}>
      <StyledIcon inputColor={color}>{ICONS[icon]}</StyledIcon>
      <StyledCategoryInfo>
        <StyledCategoryName>{name}</StyledCategoryName>
        <StyledCategoryAmount>$ {amount}</StyledCategoryAmount>
      </StyledCategoryInfo>
      {children}
    </StyledCardContainer>
  );
}
