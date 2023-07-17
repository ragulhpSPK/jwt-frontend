import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginAndRegister from "./loginandregister";
import Name from "./Name";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginAndRegister />} />
      <Route path="name" element={<Name />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
