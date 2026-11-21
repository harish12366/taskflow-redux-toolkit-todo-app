import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "./components/Header";
import Main from "./components/Main";

import { fetchTodos } from "./features/todos/todosSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;