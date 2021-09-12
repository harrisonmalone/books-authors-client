import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Book } from "./App";

export const AUTHOR = gql`
  query Authors($id: ID!) {
    author(id: $id) {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

interface Params {
  id: string;
}

export function Author() {
  const { id }: Params = useParams();
  const { data, loading } = useQuery(AUTHOR, {
    variables: {
      id: id,
    },
  });
  if (loading) {
    return null;
  }

  return (
    <div>
      <h1>{data.author.name}</h1>
      <h2>Books</h2>
      <ol>
        {data.author.books &&
          data.author.books.map((book: Book) => {
            return <li key={book.id}>{book.title}</li>;
          })}
      </ol>
    </div>
  );
}
