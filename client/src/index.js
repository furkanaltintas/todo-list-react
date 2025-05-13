import ReactDOM from 'react-dom/client';

// ApolloClient: GraphQL istemcisi oluşturmak için
// InMemoryCache: Apollo'nun önbellek sistemi
// ApolloProvider: React uygulamasına Apollo entegrasyonu sağlayan bileşen
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

import './index.css';

// Apollo Client örneği oluşturuyoruz
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // GraphQL sunucusunun adresi
  cache: new InMemoryCache() // Verileri RAM üzerinde cache'ler
});

const root = ReactDOM.createRoot(document.getElementById('root'));

// Uygulamayı ApolloProvider ile sarmalayarak çalıştırıyoruz
// Böylece alt bileşenlerde Apollo özelliklerini kullanabiliyoruz
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

/*
Apollo Client Nedir, Ne İşe Yarar ?

Apollo Client, GraphQL API'lerine bağlanmak, veri sorgulamak ve önbellekle yönetmek için kullanılan güçlü bir istemci kütüphanesidir. 
Özellikle React gibi SPA mimarilerinde şu işleri kolaylaştırır:
-   GraphQL sorguları (query) ve mutasyonları (mutation) ile veri alıp gönderme
-   Cache (önbellekleme) sayesinde veriyi tekrar tekrar istememek
-   Loading, error gibi durumları yönetme
-   React ile çok iyi entegre olur (useQuery, useMutation gibi hook'lar sağlar)
Apollo Client, REST API yerine GraphQL kullanan projelerde tercih edilir.
*/