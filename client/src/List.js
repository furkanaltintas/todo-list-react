import { useQuery, useMutation } from "@apollo/client";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import "moment/locale/tr";
import { useContext } from "react";
import { TodoContext } from "./TodoContext";

import { GET_TODOS } from "./graphql/Query";
import { DELETE_TODO } from "./graphql/Mutation";

export default function List() {
  const { secilenId, setSecilenId } = useContext(TodoContext);
  const { loading, error, data } = useQuery(GET_TODOS);

  const [deleteTodo] = useMutation(DELETE_TODO);

  const handleDelete = (id) => {
    deleteTodo({
      variables: { id: id },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  if (loading) return <p className="text-center text-warning">Yükleniyor...</p>;
  if (error) return <p className="text-center text-danger">{error.message}</p>;

  return (
    <main className="container list">
      <header className="text-center fs-2 title fw-bold mb-4">
        Yapılacaklar
      </header>
      {data.todolarGetir.length === 0 ? (
        <div class="alert alert-danger text-center" role="alert">
          Henüz yapılacak eklenmedi
        </div>
      ) : (
        <section className="list-group">
          {data?.todolarGetir.map((todo) => (
            <article
              className="list-group-item list-group-item-action"
              aria-current="true"
              key={todo.id}
              onClick={() => setSecilenId(todo.id)}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{todo.baslik}</h5>
                <i onClick={(e) => {
                  e.stopPropagation(); // setSecilenId onClick yapısı engellendi
                  handleDelete(todo.id);
                }}>
                  <MdDelete />
                </i>
              </div>
              <p className="mb-1">{todo.aciklama}</p>
              <time>{moment(todo.tarih).fromNow()}</time>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
