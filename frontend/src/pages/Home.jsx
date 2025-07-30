import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import { useNavigate } from 'react-router-dom';

const apiUrl = (import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_API_URL
  : import.meta.env.VITE_API_URL
)

//const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query === '') {
      navigate(`/`);
    } else {
      navigate(`/search?q=${query}`);
    }

  }

  useEffect(() => {
    setLoading(true);
    console.log("🌐 API URL:", apiUrl); // kiểm tra thử
    axios
      //.get('http://localhost:5555/books')
      .get(`${apiUrl}books`)
      .then((response) => {
        console.log('📦 Dữ liệu trả về từ API:', response.data);
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <><h1 className="text-3xl font-bold text-slate-700 border-b-2 border-indigo-500 inline-block pb-2 my-8">
      Trang chủ
    </h1>

      <div className="w-full max-w-md mx-auto mt-8">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm sách..."
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition duration-200">
            Tìm
          </button>
        </div>
      </div>

      <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
          <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('table')}
          >
            Table
          </button>
          <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('card')}
          >
            Card
          </button>
        </div>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Books List</h1>
          <Link to='/books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div></>
  );
};

export default Home;