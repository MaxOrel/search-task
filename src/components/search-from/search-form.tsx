import { ChangeEvent, useEffect, useState } from 'react';
import { FormStateType } from './helpers/types';
import "./styles.css";

type SearchFormProps = {
  onSearch: (data: FormStateType) => void;
};

export function SearchForm({ onSearch }: SearchFormProps) {
  const [formState, setFormState] = useState<FormStateType>({
    search: ''
  });

  function inputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    onSearch?.(formState);
  }, [formState, onSearch]);

  return (
    <div className="searchForm">
      <form>
        <input name='search' type="text" onChange={inputChangeHandler} value={formState.search} />
      </form>
    </div>
  );
}
