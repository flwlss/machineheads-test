import { useSelector } from "react-redux";
import Router from "./navigation/Router";
import type { RootState } from "./store/reducers";
import { Spin } from "antd";

function App() {
  const loading = useSelector((state: RootState) => state.common.loading);
  return (
    <>
      {loading && <Spin fullscreen />}
      <Router />
    </>
  );
}

export default App;
