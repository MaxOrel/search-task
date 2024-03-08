import { useContext } from "react";
import { UserCard } from "../user-card/user-card";
import { SearchContext } from "./search-context";

import "./style.css";

export function SearchResults() {
  const { users } = useContext(SearchContext);

  return (
    <div className="usersList">
      {users.map((user) => (
        <UserCard {...user} />
      ))}
    </div>
  );
}
