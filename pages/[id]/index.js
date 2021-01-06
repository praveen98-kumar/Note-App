import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Loader, Button } from 'semantic-ui-react';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

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
                method: 'Delete',
            });
            router.push('/');
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

export async function getServerSideProps({ params: { id }, req }) {
    const host = absoluteUrl(req, req.headers.host);
    const { data } = await axios.get(`${host.origin}/api/notes/${id}`);
    return {
        props: {
            note: data.note,
        },
    };
}
