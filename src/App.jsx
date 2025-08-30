import { useState, useEffect } from 'react'
import Header from './components/Header'
import Book from './components/Book'
import Footer from './components/Footer'

const url = 'https://openlibrary.org/search.json?title='
const imguri = 'https://covers.openlibrary.org/b/id'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [numResult, setNumResult] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [hoverIdx, setHoverIdx] = useState(null)
  const [dialog, setDialog] = useState(false)
  const [book, setBook] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searched, setSearched] = useState(false)
  const resultsPerPage = 10

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const searchBooks = async () => {
    if (!searchValue) return
    const finalUri = `${url}${searchValue}`
    try {
      const response = await fetch(finalUri, { method: 'GET' })
      if (!response.ok) throw new Error('Error getting response')
      const result = await response.json()
      setSearchResult(result.docs)
      setNumResult(result.num_found)
      setCurrentPage(1)
    } catch (err) {
      console.log(err)
    }
    setSearched(true)
  }

  // Pagination
  const indexOfLast = currentPage * resultsPerPage
  const indexOfFirst = indexOfLast - resultsPerPage
  const currentResults = searchResult?.slice(indexOfFirst, indexOfLast)

  return (
    <div className="bg-zinc-100 pt-24 dark:text-white justify-between text-black flex flex-col dark:bg-zinc-950 min-h-screen">
      <div className = "flex flex-col items-center dark:bg-zinc-950">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="flex max-sm:flex-col sm:items-center gap-6 my-8">
          <img src="/books.jpg" className="w-[250px] h-[250px] object-cover rounded-xl" />
          <div className="flex flex-col font-semibold text-5xl max-sm:text-4xl">
            <h1 className="font-['times_new_roman']">SEARCH.</h1>
            <h1 className="font-['times_new_roman']">YOUR.</h1>
            <h1 className="font-['times_new_roman']">FAVORITE.</h1>
            <h1 className="font-['times_new_roman']">BOOK.</h1>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            searchBooks()
          }}
          className="w-3/5 max-sm:w-[90%] rounded-full shadow-[0_2px_3px_1px_rgba(0,0,0,0.3)] bg-zinc-200 dark:bg-zinc-800 flex justify-center items-center"
        >
          
          <input
            type="text"
            className="w-full h-[60px] max-sm:h-[40px] max-sm:text-lg text-2xl flex items-center focus:border-transparent dark:placeholder-zinc-300 placeholder-zinc-700 font-['times_new_roman'] focus:outline-none focus:ring-0 rounded-l-full px-8 bg-zinc-200 dark:bg-zinc-800"
            placeholder="book name...."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" className="sm:mx-4 bg-blue-500/20 rounded-full max-sm:mr-1 flex items-center gap-2 px-3 py-2">
            <img src = {darkMode ? `/searchlight.svg` : `/search.svg`}/>
            <p className = "mr-4 font-bold sm:text-sm md:text-md lg:text-lg text-zinc-600 dark:text-zinc-300 max-sm:hidden">Search</p>
          </button>
        </form>

        {searched === true &&
          ((numResult > 0) ? (
            <div className="w-[80%] mt-8 font-['times_new_roman'] flex flex-col gap-4">
              <h1 className="mx-8 font-bold text-2xl">Search Results ({numResult})</h1>
              <div className="flex flex-col gap-6 mb-10">
                {currentResults?.map((doc, idx) => (
                  <div
                    key={idx}
                    onMouseOver={() => {
                      setHovering(true)
                      setHoverIdx(idx)
                    }}
                    onMouseLeave={() => {
                      setHovering(false)
                      setHoverIdx(null)
                    }}
                    className="w-full rounded-2xl shadow-[0_2px_3px_1px_rgba(0,0,0,0.3)] bg-zinc-200 dark:bg-zinc-800"
                  >
                    <div className="w-full flex max-sm:flex-col justify-between items-stretch p-4 sm:p-8">
                      <div className="flex items-center justify-center">
                        {doc.cover_i ? (
                          <img
                            className="h-[180px] w-[150px] object-top object-cover"
                            src={`${imguri}/${doc.cover_i}-L.jpg`} // Append -L for large image
                            alt={doc.title}
                          />
                        ) : (
                          <div className="h-[180px] w-[150px] flex items-center justify-center bg-gray-200 text-gray-700 text-center text-sm">
                            Cover not available
                          </div>
                        )}
                      </div>

                      <div className="flex-1 max-sm:mt-2 sm:px-4 sm:py-4 gap-2 flex flex-col">
                        <h1 className="text-3xl max-sm:text-2xl break-words font-bold line-clamp-2">{doc.title}</h1>
                        <p className="text-2xl max-sm:text-xl dark:text-zinc-400 text-zinc-700 font-bold">{doc.first_publish_year}</p>
                      </div>

                      <div className="flex sm:py-4 sm:w-[25%] flex-col">
                        <div className="flex max-sm:flex-wrap sm:flex-col gap-1 text-xl mt-1 font-bold dark:text-zinc-400 text-zinc-700 overflow-x-auto">
                          {doc.author_name?.map((name, ind) => (
                            <p key={ind} className="max-sm:line-clamp-1">
                              {name}
                              {doc.author_name[ind + 1] && ','}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setDialog(true)
                        setBook(doc)
                      }}
                      className={`bg-green-900/80 ${
                        hovering && hoverIdx === idx ? '' : 'opacity-0'
                      } hover:bg-green-700/80 text-white rounded-b-xl font-bold p-2 w-full transition-all duration-300`}
                    >
                      VIEW DETAILS
                    </button>
                  </div>
                ))}
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {Array.from({ length: Math.ceil(searchResult.length / resultsPerPage) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-300 dark:bg-zinc-700 text-black dark:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className = "mt-4 text-xl font-['times_new_roman'] text-red-600 italic ">
              No book was found with that name. Please type something more relevant.
            </div>
          ))
        }
        {dialog && <Book setDialog={setDialog} book={book} imguri={imguri} />}
      </div>
      <Footer />
    </div>
  )
}

export default App
