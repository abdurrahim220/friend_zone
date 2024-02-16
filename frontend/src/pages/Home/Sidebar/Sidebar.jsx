import React from "react";
import SearchInput from "../../../components/SearchInput/SearchInput";
import ConversationPage from "../../ConversationPage/ConversationPage";
import LogOutButton from "../../../components/LogOutButton/LogOutButton";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px3"></div>
      <ConversationPage />
      <LogOutButton />
    </div>
  );
};

export default Sidebar;
