import { gql } from '@apollo/client';

export const GET_TODOS = gql`

    {
        todolarGetir {
            id, baslik, aciklama, tarih
        }
    }
`;

export const GET_TODO = gql`

    query todoGetir($id:ID) {
        todoGetir(id:$id) {
            id, baslik, aciklama, tarih
        }
    }
`