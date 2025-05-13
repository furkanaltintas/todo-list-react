// Express Framework'ünü import ediyoruz.
// Express, Node.js üzerinde web sunucusu oluşturmamıza yardımcı olur.
import express from "express";
// Apollo Server'ı express ile birlikte kullanmak için gerekli modülleri import ediyoruz.
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";

import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Sunucuyu başlatmak için bir async fonksiyon tanımlıyoruz.
async function initServer() {
  // Express uygulamasını başlatıyoruz.
  const app = express();

  // CORS middleware'i ekliyoruz, böylece farklı origin'lerden gelen isteklere izin verilir.
  app.use(cors());

  // Ortam değişkenlerini .env dosyasından yüklüyoruz.
  dotenv.config();

  // Apollo Server'ı tanımlıyoruz. Ona GraphQL tipleri ve çözümleyicileri (resolvers) veriyoruz.
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  // Apollo Server'ı başlatıyoruz. Bu adım async olduğu için "await" ile bekliyoruz.
  await apolloServer.start();

  // Apollo Server'ı Express uygulamasına entegre ediyoruz.
  apolloServer.applyMiddleware({ app });

  // Diğer tüm istekler için basit bir yanıt döndürüyoruz.
  // Eğer biri GraphQL dışı bir adrese giderse bu mesaj gösterilecek
  app.use((req, res) => {
    res.send("Server Başlatıldı");
  });

  try {
    // MongoDB veritabanına bağlantı kuruluyor.
    await mongoose.connect(process.env.mongodb);
    console.log("Veritabanı bağlantısı başarılı");

  } catch (error) {
    // Bağlantı hatası olursa konsola yazdırılır.
    console.log(error);
  }

  // Sunucunun çalışacağı port numarasını belirliyoruz.
  // Eğer ortam değişkeninde (process.env.PORT) bir port varsa onu kullan, yoksa 5000.
  const PORT = process.env.PORT || 5000;

  // Express sunucusunu dinlemeye başlatıyoruz.
  app.listen(PORT, () => {
    console.log(`Express server ${PORT} da çalışıyor`);
  });
}

// Yukarıda tanımladığımız sunucu başlatma fonksiyonunu çağırıyoruz.
initServer();
