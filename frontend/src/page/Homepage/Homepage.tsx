import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BiBookBookmark, BiFootball } from "react-icons/bi";
import { MdOutlineArticle, MdOutlineComputer } from "react-icons/md";
import useAxios from "../../utils/useAxios";
export default function Homepage() {
  interface FiturType {
    judul: string;
    deskripsi: string;
    logo: React.ReactNode;
  }
  interface BookType {
    id: number;
    title: string;
    author: string;
    publisher: string;
    price: number | null;
    category: [];
    created_at: string;
    updated_at: string;
  }
  const { user, authTokens } = useContext(AuthContext);
  const [books, setBooks] = useState<BookType[] | null>();
  const axios = useAxios();
  const fitur: FiturType[] = [
    {
      judul: "BAKMI TK",
      deskripsi: "Kumpulan Materi Teknik Kimia",
      logo: <BiBookBookmark className="text-white text-[50px] group-hover:text-[rgb(238,190,28)] transition-all" />,
    },
    {
      judul: "CHENLEA",
      deskripsi: "Ajang olahraga teknik kimia",
      logo: <BiFootball className="text-white text-[50px] group-hover:text-[rgb(238,190,28)] transition-all" />,
    },
    {
      judul: "CHEESE",
      deskripsi: "Kumpulan software teknik kimia",
      logo: <MdOutlineComputer className="text-white text-[50px] group-hover:text-[rgb(238,190,28)] transition-all" />,
    },
    {
      judul: "H-IRON",
      deskripsi: "Lomba artikel ilmiah nasional",
      logo: <MdOutlineArticle className="text-white text-[50px] group-hover:text-[rgb(238,190,28)] transition-all" />,
    },
  ];
  useEffect(() => {
    fetchBook();
  }, [authTokens]);
  async function fetchBook() {
    try {
      const response = await axios.get("/book/");
      setBooks(response?.data);
    } catch (e: unknown) {
      setBooks(null);
    }
  }
  return (
    <div className="container m-auto">
      {/* Fitur */}
      <div className="grid grid-cols-2 md:grid-cols-4 mt-10">
        {fitur.map((f) => (
          <div className="border flex flex-col justify-center items-center group/h2" key={f.judul}>
            <div className="w-20 h-20 bg-[rgb(104,0,0)] rounded-tl-full rounded-bl-full rounded-br-full flex justify-center items-center group hover:scale-[1.1] transition-all hover:rotate-2 m-[10px]">{f.logo}</div>
            <h2 className="text-[rgb(104,0,0)] text-[24px] font-semibold mb-[1px] group-hover/h2:text-[#7A7A7A] transition-colors text-center">{f.judul}</h2>
            <h3 className="text-[#7A7A7A] text-[16px] font-medium text-center">{f.deskripsi}</h3>
          </div>
        ))}
      </div>
      {/* end fitur */}
      <div className="">
        {books?.map((book) => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    </div>
  );
}
