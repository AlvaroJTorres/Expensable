import { RiCalendarEventFill, RiDeleteBack2Fill } from "react-icons/ri";
import { ReactComponent as Check } from "../icons/check.svg";
import styled from "styled-components";
import tw from "twin.macro";
import { STYLES } from "../app/config";

const StyledButton = styled.button`
  ${tw`px-4 py-2.5 border border-inherit bg-white`}
`;

const StyledOperatorButton = styled.button`
  ${tw`px-4 py-2.5 border border-inherit bg-gray-100`}
`;

const StyledSubmitButton = styled.button`
  ${tw`px-4 py-10 border border-inherit bg-cyan-500 text-white`}
`;

export default function NumPad({
  operator,
  opClick,
  numClick,
  submit,
  calculate,
  del,
  clear,
  color,
  toggleDisplay,
}) {
  return (
    <div className="grid grid-cols-5 w-full h-full">
      <StyledOperatorButton
        className="px-4 py-2.5"
        onClick={() => opClick("÷")}
      >
        ÷
      </StyledOperatorButton>
      <StyledButton onClick={() => numClick("1")}>1</StyledButton>
      <StyledButton onClick={() => numClick("2")}>2</StyledButton>
      <StyledButton onClick={() => numClick("3")}>3</StyledButton>
      <StyledButton onClick={del}>
        <RiDeleteBack2Fill />
      </StyledButton>
      <StyledOperatorButton onClick={() => opClick("*")}>
        ×
      </StyledOperatorButton>
      <StyledButton onClick={() => numClick("4")}>4</StyledButton>
      <StyledButton onClick={() => numClick("5")}>5</StyledButton>
      <StyledButton onClick={() => numClick("6")}>6</StyledButton>
      <StyledButton onClick={clear}>c</StyledButton>
      <StyledOperatorButton onClick={() => opClick("-")}>
        -
      </StyledOperatorButton>
      <StyledButton onClick={() => numClick("7")}>7</StyledButton>
      <StyledButton onClick={() => numClick("8")}>8</StyledButton>
      <StyledButton onClick={() => numClick("9")}>9</StyledButton>
      <StyledSubmitButton
        className="button row-span-2"
        onClick={operator ? calculate : submit}
        style={{ backgroundColor: STYLES[color] }}
      >
        {operator ? "=" : <Check />}
      </StyledSubmitButton>
      <StyledOperatorButton onClick={() => opClick("+")}>
        +
      </StyledOperatorButton>
      <StyledButton onClick={toggleDisplay}>
        <RiCalendarEventFill />
      </StyledButton>
      <StyledButton onClick={() => numClick("0")}>0</StyledButton>
      <StyledButton onClick={() => numClick(".")}>.</StyledButton>
    </div>
  );
}
