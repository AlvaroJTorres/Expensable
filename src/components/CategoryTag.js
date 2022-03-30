import styled from "styled-components";
import tw from "twin.macro";
import { FILLICONS, STYLES } from "../app/config";

const StyledContainer = styled.div.attrs({
  className: "w-full h-14 flex py-1.5 px-3 gap-2 text-white",
})`
  & {
    .icon {
      ${tw`w-10 h-10 bg-white rounded-full flex items-center justify-center p-2`}
    }
    .container {
      ${tw`flex flex-col`}
      .type {
        ${tw`text-xs text-white`}
      }
      .category_tag {
        ${tw`text-base text-white`}
      }
    }
  }
`;

export default function CategoryTag({ category, dispatch }) {
  return (
    <StyledContainer style={{ backgroundColor: STYLES[category.color] }}>
      <div className="icon">{FILLICONS[category.icon]}</div>
      <div className="container">
        <p className="type">Add {category.type} to</p>
        <p className="category_tag">{category.name}</p>
      </div>
      <button onClick={() => dispatch({ type: "closed" })}>X</button>
    </StyledContainer>
  );
}
