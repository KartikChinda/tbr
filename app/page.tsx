"use client";
import { useState } from "react";
import { FormEvent } from "react";
import { v4 as uuid } from 'uuid';
import BookModel from "./models/Book";

export default function Home() {



  const [book, setBook] = useState<string>("");

  const [counter, setCounter] = useState<number>(0);

  const [books, setBooks] = useState<BookModel[]>([]);


  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setBooks([{ title: book, id: uuid(), completed: false }, ...books]);
    console.log(books)
    setBook("");
  }

  const handleDelete = (id: string): void => {
    setBooks(books.filter((b) => b.id !== id));
  }

  const handleComplete = (id: string) => {
    // This is the set books, you map, and you have to return this array back too, which is why if your id matches, then you spread the rest of the book, and return with the id opposite to original id. If not then you return the book as it is. 
    setBooks(books.map(b => b.id === id ? { ...b, completed: !b.completed } : b));

    //  this is interesting af. Why is this the way that false pe you increase counter? This is because it takes time for the setbooks to get completed, during which this runs, so we are not talking about the anticipated state, but the current state. 
    const currBook = books.find((b) => b.id === id);
    currBook?.completed === false ? setCounter(counter + 1) : setCounter(counter - 1);
  }




  return (
    <>

      <div className="md:mx-auto p-4 md:w-[70%] rounded-xl  m-4 flex flex-col justify-start items-center">
        No of books completed so far: <span>{counter}</span>
      </div>
      <section className="md:mx-auto p-4 md:w-[70%] bg-[#638889] rounded-xl border-[3px] border-[#9DBC98] m-4 h-[70vh] flex flex-col justify-start items-center">

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
