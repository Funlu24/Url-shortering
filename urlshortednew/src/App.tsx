import { Home, Router } from "lucide-react";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {" "}
      //tüm yönlendirmeleri burada yaparız
      <Router>
        {" "}
        //
        <Route path="/" element={<Home />} /> //ana sayfaya girdiğini
        <Route path="/:slug" element={<Home />} /> //dinamik url ye girdiğini
        gösterir.
      </Router>
    </BrowserRouter>
  );
}

export default App;
