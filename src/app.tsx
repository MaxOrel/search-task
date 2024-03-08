import { useCallback, useState } from "react";
import { FormStateType, SearchForm } from "./components/search-from/search-form";
import { SearchContext } from "./components/search-results/search-context";
import { SearchResults } from "./components/search-results/search-results";
import { User } from './models/user-models';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  const formSearchHandler = useCallback(function (data: FormStateType) {
    fetch(`https://dummyjson.com/users/search?q=${data.search}`).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err))).then(data => setUsers(data.users));
  }, []);


  return (
    <SearchContext.Provider value={{ users }}>
      <SearchForm onSearch={formSearchHandler} />
      <SearchResults />
    </SearchContext.Provider>
  );
}
