// mongoose kütüphanesini ve içinden Schema'yı import ediyoruz.
// mongoose: MongoDB ile kolayca çalışmamızı sağlar.
// Schema: Veritabanında belgelerin (document) yapısını tanımlamak için kullanılır.
import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    // "baslik" alanı: Tipi String ve zorunlu (required).
    baslik: {
      type: String,
      required: true,
    },

    // "aciklama" alanı: Opsiyonel bir metin (String) olabilir.
    aciklama: String,

    // "tarih" alanı: Bir tarih (Date) türünde olabilir.
    tarih: String,
  },
  {
    // timestamps: true ile mongoose, otomatik olarak şu iki alanı ekler:
    // - createdAt: Belge ne zaman oluşturuldu
    // - updatedAt: Belge ne zaman güncellendi
    timestamps: true,
  }
);

// Yukarıda tanımladığımız şemadan bir "Model" oluşturuyoruz.
// Model, MongoDB koleksiyonuyla doğrudan işlem yapmamızı sağlar (ekle, sil, güncelle, bul).
// İlk parametre: koleksiyon adı (mongoose bunu otomatik küçük harf ve çoğul hale getirir => "todos")
// İkinci parametre: şemamız.
const Todo = mongoose.model("todo", todoSchema);

// Bu modeli dışa aktarıyoruz (export).
// Böylece diğer dosyalarda `import Todo from './todoModel.js'` diyerek bu modeli kullanabiliriz.
export default Todo;


// ÖZET
// Bu model sayesinde MongoDB'de başlık, açıklama ve tarih içeren "todo" kayıtları oluşturabilir,
// listeleyebilir, güncelleyebilir ve silebilirsin.