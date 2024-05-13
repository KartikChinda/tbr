"use client";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import { v4 as uuid } from 'uuid';
import BookModel from "./models/Book";

export default function Home() {



  const [book, setBook] = useState<string>("");

  const [counter, setCounter] = useState<number>(() => {
    const newCounter = localStorage.getItem("counter") || "0";
    const finalCount = JSON.parse(newCounter)
    if (localStorage.getItem("counter") === null) {
      return finalCount;
    }
    return finalCount + 1;
  });

  const [books, setBooks] = useState<BookModel[]>(() => {
    const newBooks = localStorage.getItem("storeBooks") || "[]";
    return JSON.parse(newBooks);
  });


  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const currBook: BookModel = { title: book, id: uuid(), completed: false }
    setBooks([currBook, ...books]);
    setBook("");
    localStorage.setItem("storeBooks", JSON.stringify([currBook, ...books]));
  }

  const handleDelete = (id: string) => {

    setBooks(books.filter((b) => b.id !== id))
    const delBooks = books.filter((b) => b.id !== id)

    localStorage.setItem("storeBooks", JSON.stringify(delBooks))

  }

  const handleComplete = (id: string) => {
    // This is the set books, you map, and you have to return this array back too, which is why if your id matches, then you spread the rest of the book, and return with the id opposite to original id. If not then you return the book as it is. 
    setBooks(books.map(b => b.id === id ? { ...b, completed: !b.completed } : b));
    const delBooks = books.map(b => b.id === id ? { ...b, completed: !b.completed } : b)

    localStorage.setItem("storeBooks", JSON.stringify(delBooks))

    //  this is interesting af. Why is this the way that false pe you increase counter? This is because it takes time for the setbooks to get completed, during which this runs, so we are not talking about the anticipated state, but the current state. 
    const currBook = books.find((b) => b.id === id);
    currBook?.completed === false ? setCounter(counter + 1) : setCounter(counter - 1);

    localStorage.setItem("counter", JSON.stringify(counter));


  }




  return (
    <>

      <div className="md:mx-auto p-4 md:w-[70%] rounded-xl  m-4 flex flex-col justify-start items-center text-[#638889] font-bold">
        Books read so far: <span className="text-8xl hover:-skew-x-6">{counter}</span>
      </div>
      <section className="md:mx-auto p-4 md:w-[70%] bg-[#638889] rounded-xl border-[3px] border-[#9DBC98] m-4  min-h-[60vh]  flex flex-col justify-start items-center">

        <form onSubmit={(e => handleSubmit(e))}>
          <div className="flex flex-row items-center justify-center">
            <input value={book} onChange={e => setBook(e.target.value)} placeholder="Add book to TBR" className="p-2 mb-3 rounded-lg mt-3 bg-[#F9EFDB] text-[#638889]" />
            <button type="submit" className="px-2 py-1 mx-4 rounded-xl text-3xl font-bold border-2 border-[#9DBC98] hover:text-4xl text-[#EBD9B4] hover:border-[#F9EFDB] bg-[#9DBC98]">+</button>
          </div>

          <ul className="mt-12 flex gap-3 flex-col justify-start items-center">
            {books.map((book: BookModel) => {
              return (
                <div key={book.id} className="flex flex-row justify-between p-2 text-2xl rounded-xl border-2 border-[#F9EFDB] font-bold bg-[#9DBC98] text-[#638889] w-full">
                  <li onClick={() => (handleComplete(book.id))} className={book.completed ? `line-through decoration-[#4a6465] cursor-pointer pr-2 text-[#6388897b]` : `cursor-pointer pr-2`}> {book.title}</li>
                  <button className="bg-[#4a6465] rounded-xl" onClick={() => handleDelete(book.id)}>🗑️</button>
                </div>
              )
            })}
          </ul>

        </form>
      </section>
    </>
  );
}
