import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import PropertyDetail from "./pages/propertyDetails/PropertyDetail";
import PropertyList from "./pages/propertyList/PropertyList";


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/list/:city' element={<PropertyList />} />
        <Route path='/detail/:city/:propertyId' element={<PropertyDetail />} />
      </Routes>
    </>
  );
}

export default App;
