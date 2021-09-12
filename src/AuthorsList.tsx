import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Author, AUTHORS } from "./App";
import { Link } from "react-router-dom";

interface Props {
  authors: Author[];
}

const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

export function AuthorsList({ authors }: Props) {
  const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [AUTHORS, "Authors"],
    onError: (error) => {
      console.log(error.message);
    },
  });

  function onDeleteAuthorClick(
    e: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    e.preventDefault();
    deleteAuthor({
      variables: {
        id: id,
      },
    });
  }

  return (
    <>
      <h1>Authors</h1>
      {authors.map((author: Author) => (
        <div className="author" key={author.id}>
          <Link to={`/author/${author.id}`}><h2>{author.name}</h2></Link>
          <h4>Books</h4>
          <ol>
            {author.books &&
              author.books.map((book) => <li key={book.id}>{book.title}</li>)}
          </ol>
          <button onClick={(e) => onDeleteAuthorClick(e, author.id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
