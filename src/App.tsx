import { gql, useQuery } from "@apollo/client";
import "./App.css";
import { AuthorsList as AuthorsPage } from "./AuthorsList";
import { CreateAuthor } from "./CreateAuthor";
import { Switch, Route, Link } from "react-router-dom";
import { Author as AuthorPage } from "./Author";

export const AUTHORS = gql`
  query Authors {
    authors {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

export interface Book {
  id: string;
  title: string;
}
export interface Author {
  id: string;
  name: string;
  books: Book[];
}

function App() {
  const { data, loading, error } = useQuery(AUTHORS);

  if (loading) {
    return null;
  }

  if (error) {
    return <h1>Server error</h1>;
  }

  return (
    <div className="container">
      <nav>
        <Link
          to="/"
          style={{
            marginRight: "10px",
          }}
        >
          Home
        </Link>
        <Link to="/author/create">Create Author</Link>
      </nav>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <AuthorsPage authors={data.authors} />;
          }}
        />
        <Route exact path="/author/create" component={CreateAuthor} />
        <Route exact path="/author/:id" component={AuthorPage} />
      </Switch>
    </div>
  );
}

export default App;
