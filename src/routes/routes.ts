import { createBrowserRouter } from "react-router";
import { ModelViewer } from "../pages/Home/ModelViewer";

export const routes = createBrowserRouter([
  { path: "*", Component: ModelViewer },
]);
