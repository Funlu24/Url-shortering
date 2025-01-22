import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate(); //useNavigate() fonksiyonunu kullanarak yönlendirme yaparız başka bir sayfaya gitmesini sağlarız.
  const code = useParams(); //URL parametrelerini almak için useParams() fonksiyonunu kullanırız.
  console.log(code);

  useEffect(() => {
    const fetchdata = async () => {
      //veri çekmeye çalısır.
      const res = await fetch(`http://localhost:8000/${code}`, {
        //slug ile değistir.!  //fetch() fonksiyonu ile sunucuya istek atarız.
        method: "GET",

        headers: {
          "Content-Type": "application/json", //json verisi içerdiğini belirtir. get json verisi gonereme ama döndürmek için
        },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; //Kullanıcının tarayıcısını verilen URL'ye taşır
      } else {
        console.log(data);
      }
    };
    fetchdata();
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-center m-5">
      <h1 className="text-4xl font-bold">404</h1>
      <button onClick={() => navigate("/")}>Page not found</button>
    </div>
  );
}; //hata alırsa basınca ana sayfaya yonlenir.
export default NotFound;
