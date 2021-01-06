import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Loader, Button } from 'semantic-ui-react';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';


const EditNote = ({ note }) => {
    const [data, setData] = useState({
        title: note.title,
        description: note.description,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateNote();
            } else setIsSubmitting(false);
        }
    }, [errors]);
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };
    const validate = () => {
        let err = {};
        if (!data.title) {
            err.title = 'Title is required';
        }
        if (!data.description) {
            err.description = 'Description is required';
        }
        return err;
    };
    const updateNote = async () => {
        const noteId = router.query.id;
        try {
            const res = await fetch(`/api/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="form-container">
            <h1>Create Note</h1>
            <div>
                {isSubmitting ? (
                    <Loader active inline="centered" />
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={
                                errors.title
                                    ? {
                                          content: 'Please enter a title',
                                          pointing: 'below',
                                      }
                                    : null
                            }
                            placeholder="Title"
                            label="Title"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid
                            error={
                                errors.description
                                    ? {
                                          content: 'Please enter a description',
                                          pointing: 'below',
                                      }
                                    : null
                            }
                            placeholder="Description"
                            label="Description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                        />
                        <Button type="submit">Update</Button>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default EditNote;


export async function getServerSideProps({ params: { id }, req }) {
    const host = absoluteUrl(req, req.headers.host);
    const { data } = await axios.get(`${host.origin}/api/notes/${id}`);
    return {
        props: {
            note: data.note,
        },
    };
}

