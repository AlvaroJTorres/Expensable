import styled from "styled-components";
import tw from "twin.macro";

const StyledDiv = styled.main.attrs({
  className:
    "w-full h-12 py-2.5 border border-inherit flex justify-center content-center bg-white",
})`
  & {
    input {
      ${tw`w-6/12`}
    }
  }
`;

export default function Screen({
  prevNumber,
  operator,
  currentNumber,
  opClick,
  numClick,
  submit,
  calculate,
  del,
  clear,
}) {
  function handleChange(e) {
    if (/[0-9]/.test(e.target.value.slice(-1))) {
      numClick(e.target.value.slice(-1));
    } else if (/[\-\/*+]/.test(e.target.value.slice(-1))) {
      opClick(e.target.value.slice(-1));
    }
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      operator ? calculate() : submit();
    } else if (e.keyCode === 8) {
      del();
    } else if (e.keyCode === 67) {
      clear();
    }
  }
  return (
    <StyledDiv>
      <input
        value={`$ ${[prevNumber, operator, currentNumber].join(" ")}`}
        onChange={handleChange}
        onKeyDown={(e, category) => handleKeyDown(e, category)}
      />
    </StyledDiv>
  );
}
