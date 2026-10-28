import { Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./pages/ListPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" replace />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/list-item/:id" element={<ItemDetailPage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  );
}

export default App;