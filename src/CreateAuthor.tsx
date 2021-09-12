import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AUTHORS } from "./App";
import { useHistory } from "react-router";

const ADD_AUTHOR = gql`
  mutation CreateAuthor($input: AuthorInput!) {
    createAuthor(input: $input) {
      id
      name
    }
  }
`;

export function CreateAuthor() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [addAuthor] = useMutation(ADD_AUTHOR, {
    refetchQueries: [AUTHORS, "Authors"],
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: () => {
      history.push("/");
    },
  });

  function onCreateAuthorSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name === "") return
    addAuthor({
      variables: {
        input: {
          name: name,
        },
      },
    });
  }

  return (
    <>
      <h1>Add new author</h1>
      <form onSubmit={onCreateAuthorSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
