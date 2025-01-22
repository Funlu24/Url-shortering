const express = require("express");
const router = express.Router();

const UrlModel = require("../models/UrlModel");
const { short } = require("webidl-conversions");

const isValidUrl = (UrlModel) => {
  //Bu fonksiyon, girilen URL’nin geçerli olup olmadığını kontrol etmek için kullanılır.
  const urlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/); //http https ftp ile başlayan bir url olmalıdır. \/ zorunlu demektir.[^ "]+$ → Boşluk içermeyen karakterlerden oluşan bir dizi olmasını sağlar.
  // $ → Metnin sonunu ifade eder.
  //URL’nin geçerli olup olmadığını kontrol etmek için bir regex oluşturuldu.
  return urlRegex.test(Url); //true ise geçerli, false ise geçersiz URL olduğunu gösterir.
};

const generateShortcode = (longUrl) => {
  const hash = crypto.createHash("sha256").update(longUrl).digest("base64");
  return hash.slice(/^[a-zA-Z0-9]/g, "").substring(0, 8); //hash değerinden ilk 8 karakter alınır.
};

router.post("/shorten", async (req, res) => {
  const { longUrl, custom } = req.body; //gelen istekten longUrl ve custom alanları alınır.

  if (!isValidUrl) {
    return res.status(400).json({ error: "Invalid URL" }); //url nin geçerlilik kontrolü yapılır.
  }

  try {
    const alreadyExists = await UrlModel.findOne({ longUrl });
    // veritabanına daha once kayıtlı mı diye kontrol edilir.
    if (alreadyExists)
      return res.json({
        shortUrl: `${process.env.CLIENT_URL}/${alreadyExists.shortcode}`,
      });

    if (custom) {
      //kullanıcı bir kod girerse
      const url = new UrlModel({
        longUrl,
        shortcode: custom,
      });

      await url.save();

      return res.json({ shortUrl: `${process.env.CLIENT_URL}/${custom}` });
    }

    const code = generateShortcode(longUrl); //otamatik kısa kod olusturur.

    const url = new UrlModel({
      longUrl,
      shortcode: code,
    });

    await url.save();
    res.json({ shortUrl: `${process.env.CLIENT_URL}/${code})` });
  } catch (error) {
    console.log("Error shortening URL", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:Code", async (req, res) => {
  //Bu rota, kullanıcı bir kısa URL'yi ziyaret ettiğinde orijinal uzun URL’ye yönlendirmek için kullanılıyor.
  const { Code } = req.params;

  try {
    const isCode = await UrlModel.findOne({ shortcode: Code });
    //kullanıcının girdiği kodun veritabanında olup olmadığı kontrol edilir. eger varsa uzun kod linkin edönüşü yapılır.
    if (isCode) return res.json({ url: isCode.longUrl });

    return res.json({ error: "URL not found" }); //kod kayıtlı değilse hata mesajı döner.
  } catch (error) {
    console.log("Error redirecting URL", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
