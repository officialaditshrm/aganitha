const Book = ({book, setDialog, imguri}) => {
    return (
        <div className = "fixed dark:bg-zinc-950/30 bg-zinc-100/30 h-screen overflow-hidden w-screen z-50 top-0 left-0 backdrop-blur flex flex-col items-center justify-center">
            <div className = "max-h-[80%] w-4/5 sm:w-3/5 overflow-y-auto rounded-xl bg-zinc-200 dark:bg-zinc-800 shadow-[0_2px_3px_1px_rgba(0,0,0,0.3)] ">
                <div className = "w-full relative flex justify-end px-6">
                    <button
                    onClick={() => {setDialog(false)}}
                    className = "text-2xl">X</button>
                </div>
                <div className = "w-full overflow-y-auto">
                    <div className = "w-full flex max-sm:flex-col justify-evenly overflow-y-auto items-stretch p-8">
                        <div className = "flex items-center justify-center">
                            {book.cover_i ? (
                            <img
                                className="h-[250px] w-[160px] object-top object-cover"
                                src={`${imguri}/${book.cover_i}.jpg`}
                                alt={book.title}
                            />
                            ) : (
                            <div className="h-[240px] w-[150px] flex items-center justify-center bg-gray-200 text-gray-700 text-center text-sm">
                                Cover not available
                            </div>
                            )}
                        </div>
                        <div className = "flex-1 px-4 overflow-x-hidden overflow-y-auto">
                            <div className = "gap-2 flex flex-col overflow-y-auto">
                                <h1 className = "text-3xl overflow-y-hidden break-words font-bold overflow-x-hidden">{book.title}</h1>
                                <div className = "flex gap-1 text-xl font-bold dark:text-zinc-400 text-zinc-700">
                                {book.author_name?.map((name, ind) => {
                                    return <p key = {ind} className = "line-clamp-1">
                                    {name}
                                    {book.author_name[ind+1] && ","}
                                    </p>
                                })}
                                </div>
                                
                                <p className = "text-2xl dark:text-zinc-400 text-zinc-700 font-bold">{book.first_publish_year}</p>
                                {book.language ?
                                <div className ="rounded-md bg-zinc-300 dark:bg-zinc-700 p-2">
                                    <h1 className = "font-bold">Languages:</h1>
                                    <div className = "flex flex-wrap gap-1 ">
                                    {book.language?.map((name, ind) => {
                                        return <p key = {ind}>
                                        {name}
                                        {book.language[ind+1] && ","}
                                        </p>
                                    })}
                                    {book.language.length == 0 && <p>Info Unavailable</p>}
                                    </div>
                                </div>
                                :
                                <div className ="rounded-md bg-red-500/20 p-2">
                                    Language Information not available
                                </div>
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Book