import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Loader, Button } from "semantic-ui-react";
import connectDB from "../../utils/connectDB";
import Note from "../../models/Note";

const index = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const open = () => {
    setConfirm(true);
  };
  const close = () => {
    setConfirm(false);
  };
  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };
  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`/api/notes/${noteId}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);
  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color="red" onClick={open}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
};

export default index;

export async function getServerSideProps({ params }) {
  await connectDB();

  const note = await Note.findById(params.id).lean();
  note._id = note._id.toString();
  note.createdAt = note.createdAt.toString();
  note.updatedAt = note.updatedAt.toString();

  return { props: { note } };
}
