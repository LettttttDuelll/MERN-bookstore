import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = (import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_API_URL
  : import.meta.env.VITE_API_URL
)

function SearchPage() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (q) {
            axios
                .get(`${apiUrl}books/search?q=${q}`)
                .then(res => {
                    console.log(res.data);
                    setResults(res.data);
                })
                .catch(err => console.error(err));

        }

    }, [q]);

    return (
  <div className="max-w-4xl mx-auto py-8 px-4">
    <h1 className="text-2xl font-bold mb-6 text-center">
      Kết quả tìm kiếm cho: "<span className="text-indigo-600">{q}</span>"
    </h1>

    {results && results.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {results.map((book) => (
          <div
            key={book._id}
            className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold text-indigo-700">{book.title}</h3>
            <p className="text-gray-600 mt-1">
              <span className="font-medium">Tác giả:</span> {book.author}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Năm:</span> {book.publishYear}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 mt-8">Không tìm thấy kết quả nào.</p>
    )}
  </div>
);


}

export default SearchPage;
