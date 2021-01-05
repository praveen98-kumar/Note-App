import Link from "next/link";
import { Button, Card, Loader } from "semantic-ui-react";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

const Index = () => {
  const { data } = useSWR("/api/notes", fetcher);

  if (!data){
    return (
      <div className="notes-container">
        <Loader active inline="centered" />
      </div>
    )
  }
  const notes = data.notes;
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes.map((note) => (
          <div key={note._id}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Link href={`/${note._id}`}>
                    <a>{note.title}</a>
                  </Link>
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Link href={`/${note._id}`}>
                  <Button primary>View</Button>
                </Link>
                <Link href={`/${note._id}/edit`}>
                  <Button primary>Edit</Button>
                </Link>
              </Card.Content>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
