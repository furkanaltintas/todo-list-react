// Apollo Server'dan gql fonksiyonunu import ediyoruz.
// gql sayesinde GraphQL şemamızı (typeDefs) tanımlayabiliyoruz.
import { gql } from "apollo-server-express";

// typeDefs adında bir GraphQL şeması oluşturuyoruz.
// Burada sadece bir "Query" tipi var ve bu tipin içinde "merhaba" adında bir alan (field) bulunuyor.
// Bu alan sorgulanınca bir String (metin) dönecek.
const typeDefs = gql`

    scalar Date

    type Todo {
        id: ID,
        baslik: String,
        aciklama: String,
        tarih: Date
    }

    type Query {
        merhaba: String,
        todolarGetir:[Todo],
        todoGetir(id:ID): Todo
    }

    type Mutation {
        todoEkle(baslik:String, aciklama:String, tarih:Date): Todo,
        todoGuncelle(id:ID, baslik:String, aciklama: String, tarih: Date): Todo,
        todoSil(id:ID):String,
    }
`

// typeDefs'i dışa aktarıyoruz (export).
// Böylece ana dosyada `import typeDefs from './typeDefs.js'` diyerek kullanabiliriz.
export default typeDefs;

// GraphQL tipi tanımlıyoruz.
// Burada sadece bir adet "merhaba" adında sorgu (Query) tanımlanmış ve geriye String (metin) dönecek diyoruz.