import { useMutation, useQuery } from "@apollo/client";
import { useState, useRef, useEffect, useContext } from "react";
import { ADD_TODO } from "./graphql/Mutation";
import { UPDATE_TODO } from "./graphql/Mutation";
import { GET_TODOS } from "./graphql/Query";
import { GET_TODO } from "./graphql/Query";
import { TodoContext } from "./TodoContext";

export default function Form() {
  const inputAreaRef = useRef();

  const [todo, setTodo] = useState({
    baslik: "",
    aciklama: "",
    tarih: "",
  });

  const [todoEkle] = useMutation(ADD_TODO);
  const [todoGuncelle] = useMutation(UPDATE_TODO);

  const submitHandler = (e) => {
    e.preventDefault();

    if (secilenId === 0) {
      todoEkle({
        variables: {
          baslik: todo.baslik,
          aciklama: todo.aciklama,
          tarih: todo.tarih,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });

      setTodo({
        baslik: "",
        aciklama: "",
        tarih: "",
      });
    } else {
      todoGuncelle({
        variables: {
          id: secilenId,
          baslik: todo.baslik,
          aciklama: todo.aciklama,
          tarih: todo.tarih,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });

      setTodo({
        baslik: "",
        aciklama: "",
        tarih: "",
      });
    }
  };

  useEffect(() => {
    const formTiklandi = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        setSecilenId(0);

        setTodo({
          baslik: "",
          aciklama: "",
          tarih: "",
        });
      } else {
      }
    };

    document.addEventListener("mousedown", formTiklandi);
    return () => {
      document.removeEventListener("mousedown", formTiklandi);
    };
  }, []);

  const { secilenId, setSecilenId } = useContext(TodoContext);

  const { loading, error, data } = useQuery(GET_TODO, {
    variables: { id: secilenId },
    onCompleted: (data) => setTodo(data.todoGetir),
  });

  return (
    <form
      className="container form"
      onSubmit={submitHandler}
      ref={inputAreaRef}
    >
      <div className="text-center fs-2 title fw-bold">
        {secilenId === 0 ? "Yapılacak Ekle" : "Yapılacak Güncelle"}
      </div>
      <div className="mt-3">
        <label className="form-label text-secondary">Başlık</label>
        <input
          value={todo.baslik}
          onChange={(e) => setTodo({ ...todo, baslik: e.target.value })}
          type="text"
          className="form-control"
        />
      </div>
      <div className="mt-3">
        <label className="form-label text-secondary">Açıklama</label>
        <input
          value={todo.aciklama}
          onChange={(e) => setTodo({ ...todo, aciklama: e.target.value })}
          type="text"
          className="form-control"
        />
      </div>
      <div className="mt-3">
        <label className="form-label text-secondary">Tarih</label>
        <input
          value={
            todo.tarih ? new Date(todo.tarih).toISOString().slice(0, 10) : ""
          }
          onChange={(e) => setTodo({ ...todo, tarih: e.target.value })}
          type="date"
          className="form-control"
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary mt-3 w-100">
          {secilenId === 0 ? "Ekle" : "Güncelle"}
        </button>
      </div>
    </form>
  );
}
