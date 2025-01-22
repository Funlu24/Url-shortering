const mongoose = require("mongoose");
const { type } = require("os"); //işletim sistemi ile bilgi almasını sağlar.
const { long } = require("webidl-conversions"); //modülü ise WebIDL dönüşümleri için kullanılır

const UrlSchema = new mongoose.Schema({
  //mongoose modülü ile UrlSchema adında bir şema oluşturuldu.
  longUrl: {
    //longUrl adında bir alan oluşturuldu. saklamak için
    type: String,
    required: true, //bu alan boş geçilmiyeceğini gösterir.
  },
});

const UrlModel = mongoose.model("Url", UrlSchema); //model olusturu bu model urlschema ya dayanır.
module.exports = UrlModel;
