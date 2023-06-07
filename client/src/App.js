import "./App.css";

import { 
  useLocation, 
  Route, 
  Routes 
} from "react-router-dom";

import {
  NavBar,
  Landing,
  Home,
  Form,
  Detail,
  About,
  NotFound,
  Upload,
} from "./components/";

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload/:id" element={<Upload />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
