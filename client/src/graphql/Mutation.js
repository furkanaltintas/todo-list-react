import { gql } from "@apollo/client";

export const ADD_TODO = gql`

    mutation todoEkle($baslik:String, $aciklama:String, $tarih:Date) {
        todoEkle(baslik:$baslik, aciklama:$aciklama, tarih:$tarih) {
            id, baslik, aciklama, tarih
        }
    }
`

export const UPDATE_TODO = gql`

    mutation todoGuncelle($id:ID, $baslik:String, $aciklama:String, $tarih:Date) {
        todoGuncelle(id:$id, baslik:$baslik, aciklama:$aciklama, tarih:$tarih) {
            id, baslik, aciklama, tarih
        }
    }
`

export const DELETE_TODO = gql`

    mutation todoSil($id:ID) {
        todoSil(id:$id)
    }
`