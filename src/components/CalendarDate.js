import { format } from "date-fns";
import styled from "styled-components";
import tw from "twin.macro";

const StyledDate = styled.div`
  ${tw`w-full flex justify-center py-1.5 text-xs bg-gray-100 border border-inherit`}
`;

export default function CalendarDate({ date }) {
  return (
    <StyledDate>
      {format(new Date(`${date} `), "EEEE MMMM, dd, yyy")}
    </StyledDate>
  );
}
