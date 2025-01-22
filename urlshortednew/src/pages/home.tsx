import { useState } from "react";
const Home = () => {
  const [url, setUrl] = useState<string>(""); //kullanıcıdan gelen url yi tutar
  const [customUrl, setcustomUrl] = useState<string>(""); //kullanıcının yazacagı kısaltmayı tutar
  const [shortUrl, setShortUrl] = useState<string>(""); //shortUrl adında bir state oluşturduk ve başlangıç değeri boş bir string olarak belirledik.

  const handleShortenUrl = async () => {
    const response = await fetch("http://localhost:8000/shorten", {
      method: "POST",
      headers: {
        Content_TYPE: "application/json",
      },
      body: JSON.stringify({ longUrl: url, customUrl: customUrl }),
    });

    const data = await response.json();
    console.log(data);
    setShortUrl(data.shortUrl);
  };

  return (
    //arayüz
    <div className="flex flex-col items-center justify-center m-5">
      <input
        className="w-1/2  border border-black"
        placeholder="Enter a URL"
        value={url} //url yi saklar
        onChange={(e) => setUrl(e.target.value)} //url yi değiştirir her tusa bastıgında günceller.
      />
      <input
        className="mt-2 p-2 bg-blue-500 text-white"
        placeholder="Shorten"
        value={customUrl}
        onChange={(e) => setcustomUrl(e.target.value)}
      />{" "}
      <button
        onClick={() => {
          handleShortenUrl();
        }}
      >
        Make URL
      </button>
      <p>{shortUrl}</p>
    </div>
  );
};
export default Home;
