import Link from 'next/link'
import {useState, useEffect} from 'react';
import {Button, Form, Loader} from 'semantic-ui-react';
import {useRouter} from 'next/router';

const NewNote = () => {
	const [data, setData] = useState({title: "", description:""})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errors, setErrors] = useState({})
	const router = useRouter();
	
	useEffect(() => {
		if(isSubmitting){
			if(Object.keys(errors).length===0){
				createNote();
			} else setIsSubmitting(false);
		}
	}, [errors]);
	const handleChange = (e) => {
		setData({...data, [e.target.name]: e.target.value})
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		let errs = validate();
		setErrors(errs);
		setIsSubmitting(true);
	}
	const validate =() => {
		let err = {}
		if(!data.title){
			err.title = "Title is required"
		}
		if(!data.description){
			err.description = "Description is required"
		}
		return err;
	}
	const createNote = async () => {
		try{
			const res = await fetch('/api/notes', {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
			router.push("/")
		} catch(error){
			console.log(error)
		}
	}
	return (
		<div className="form-container">
			<h1>Create Note</h1>
			<div>
				{
					isSubmitting
						? <Loader active inline="centered" />
						: <Form onSubmit={handleSubmit}>
							<Form.Input 
								fluid
								error={errors.title ? { content: "Please enter a title", pointing: "below"} : null}
								placeholder="Title"
								label="Title"
								name='title'
								onChange={handleChange}
							/>
							<Form.Input 
								fluid
								error={errors.description ? { content: "Please enter a description", pointing: "below"} : null}
								placeholder="Description"
								label="Description"
								name='description'
								onChange={handleChange}
							/>
							<Button type="submit">Create</Button>
						</Form>
				}
			</div>
		</div>
	)
}

export default NewNote;

