import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook  from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import SearchPage from './pages/SearchPage.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/search' element={<SearchPage />} />
    </Routes>
  );
};

export default App;
