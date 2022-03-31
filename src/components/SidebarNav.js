import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as Logo } from "../icons/logo.svg";
import { useEffect, useState } from "react";
import { getUserData } from "../services/user_service";
import { logoutSession } from "../services/login_service";
import { useNavigate } from "react-router";
import { CustomLink } from "./CustomLink";
import { ReactComponent as Targeted } from "../icons/targeted.svg";
import { ReactComponent as TargetedFill } from "../icons/targetedFill.svg";
import { ReactComponent as BxCategory } from "../icons/bxCategory.svg";
import { ReactComponent as BxCategoryFill } from "../icons/bxCategoryFill.svg";
import { ReactComponent as Receipt } from "../icons/receipt.svg";
import { ReactComponent as ReceiptFill } from "../icons/receiptFill.svg";

const navigation = [
  {
    name: "Categories",
    icon: <BxCategoryFill />,
    active_icon: <BxCategory />,
  },
  {
    name: "Transactions",
    icon: <ReceiptFill />,
    active_icon: <Receipt />,
  },
  {
    name: "Budgets",
    icon: <TargetedFill />,
    active_icon: <Targeted />,
  },
];

const StyledSidebarContainer = styled.div`
  ${tw`flex flex-col justify-between bg-gray-100 border-r-2 border-gray-200`}
`;

const StyledSidebarLinksContainer = styled.div`
  ${tw`flex flex-col pt-5 px-4 gap-5`}
`;

const StyledSidebarLinks = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const StyledSidebarFooter = styled.div`
  ${tw`flex flex-col p-4 gap-5 border-t-2 border-gray-200`}
`;

const StyledUserData = styled.div`
  ${tw`flex flex-col`}
`;

const StyledUserName = styled.p`
  ${tw`text-gray-700 text-sm`}
`;

const StyledUserEmail = styled.p`
  ${tw`text-gray-500 text-xs`}
`;

const StyledLogOut = styled.p`
  ${tw`text-gray-600 text-sm cursor-pointer`}
`;

export default function SidebarNav() {
  let navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const showUser = async () => {
      const token = localStorage.getItem("token");
      const userData = await getUserData(token);
      if (userData.status === "error") {
        alert(userData.message);
      } else {
        setUser(userData);
        localStorage.setItem("userId", userData.id);
      }
    };
    showUser();
  }, []);

  async function handleLogOut() {
    const token = localStorage.getItem("token");
    const logout = await logoutSession(token);
    if (logout.status === "error") {
      alert(logout.message);
    } else {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <StyledSidebarContainer>
      <StyledSidebarLinksContainer>
        <Logo />
        <StyledSidebarLinks>
          {navigation.map((nav) => (
            <CustomLink
              key={nav.name}
              activeIcon={nav.active_icon}
              icon={nav.icon}
              to={`/${nav.name}`}
              name={nav.name}
            />
          ))}
        </StyledSidebarLinks>
      </StyledSidebarLinksContainer>
      <StyledSidebarFooter>
        <StyledUserData>
          <StyledUserName>
            {user.first_name} {user.last_name}
          </StyledUserName>
          <StyledUserEmail>{user.email}</StyledUserEmail>
        </StyledUserData>
        <StyledLogOut onClick={handleLogOut}>Log out</StyledLogOut>
      </StyledSidebarFooter>
    </StyledSidebarContainer>
  );
}
