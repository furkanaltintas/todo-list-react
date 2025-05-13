import { GraphQLScalarType, Kind } from "graphql";
import Todo from "./models/Todo.js";

// resolvers adında bir nesne tanımlıyoruz.
// Bu nesne, GraphQL sorgularının (Query) nasıl cevaplanacağını belirliyor.
const resolvers = {
    Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Date scalar type',
    parseValue(value) {
      return new Date(value); // Client -> Server (input)
    },
    serialize(value) {
      return new Date(value).toString(); // Server -> Client (output)
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    }
  }),

  Query: {
    // Query tipi içinde "merhaba" adında bir resolver fonksiyonu tanımlıyoruz.
    merhaba: () => "Merhaba Dünya 2", // Bu fonksiyon çalıştığında aşağıdaki mesaj döner.  
    todolarGetir: async () => await Todo.find(),
    todoGetir: async (_, { id }) => await Todo.findById(id)
  },
  Mutation: {
    todoEkle: async (_, { baslik, aciklama, tarih }) => {
      const yeniTodo = new Todo({ baslik, aciklama, tarih });
      return await yeniTodo.save();
    },
    todoGuncelle: async (root, args) => {
      const { id, ...fields } = args; // args içinde gelen tüm verileri id ve diğer alanlar (baslik, aciklama, tarih vs.) olarak ayırıyoruz.
      // id, dokümanı bulmak için gerekli.
      // Geri kalan her şey (baslik, aciklama, tarih) fields adlı nesneye gider.

      const guncellenecek = Object.fromEntries(Object.entries(fields).filter(([_, v]) => v !== undefined)); // undefined değerleri temizle
      // Object.entries(fields) → { baslik: "X", tarih: undefined } gibi nesneyi [['baslik', 'X'], ['tarih', undefined]] şeklinde diziye çevirir.
      // .filter(([_, v]) => v !== undefined) → değeri undefined olanları siler. Böylece sadece güncellenecek gerçek veriler kalır.
      // Object.fromEntries(...) → tekrar bir nesneye çevirir: { baslik: "X" } gibi.

      // Bu sayede, örneğin sadece başlığı güncellemek istiyorsan, yalnızca baslik alanı güncellenir; undefined olan aciklama ve tarih güncelleme işlemine dahil edilmez.

      const todo = await Todo.findByIdAndUpdate(id, guncellenecek, {
        new: true,
      });
      // findByIdAndUpdate: Belirli id'li belgeyi bulur ve günceller.
      // guncellenecek: Sadece güncellenmesi istenen alanlar gönderilir.
      // { new: true }: Bu ayar sayesinde güncellenmiş yeni belge döner (varsayılan olarak eski versiyonu döndürür).

      return todo;
    },
    todoSil: async (_, { id }) => {
      await Todo.findByIdAndDelete(id);
      return "Silindi.";
    },
  },
};

// Bu resolver nesnesini dışa aktarıyoruz (export).
// Böylece başka bir dosyada `import resolvers from './dosyaAdi'` diyerek kullanılabilir hale gelir.
export default resolvers;
