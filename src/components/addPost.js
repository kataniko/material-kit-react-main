import { useState } from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

/**
 * A component for adding a new post to a repository.
 *
 * @param {Object} props - The props object for this component.
 * @param {Function} props.onSubmit - A callback function to be called when a post is submitted.
 * @returns {JSX.Element} The JSX representation of the component.
 */
export default function AddPost({ onSubmit }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [repository, setRepository] = useState('');
    const [impact, setImpact] = useState('');
    const [tags, setTags] = useState('');
    const [bit, setBit] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * Opens the add post modal.
     */
    function handleAddButtonClick() {
        setIsModalOpen(true);
    }

    /**
     * Closes the add post modal.
     */
    function handleCloseModal() {
        setIsModalOpen(false);
    }

    /**
     * Handles the form submit event and sends a POST request to add a new post to the repository.
     * 
     * @param {Event} event - The submit event object.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { title, impact, bit };
        axios.post('https://5c1229b4-21ad-4525-8f92-feb36b03be05.mock.pstmn.io/repositorio/add', data)
            .then(response => {
                console.log(response.data);
                setIsOpen(false);
                setTitle('');
                setImpact('');
                setBit('');
                setIsModalOpen(false);
                onSubmit(); // Call the onSubmit callback function
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <Button
                onClick={() => {
                    handleAddButtonClick();
                }} sx={{ backgroundColor: "black" }} variant="contained">
                Add
            </Button>
            {isModalOpen && (
                <Modal onClose={handleCloseModal} open={isModalOpen}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 1,
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                        }}
                    >
                        <form onSubmit={handleSubmit}>

                            <TextField
                                id="title"
                                label="Title"
                                fullWidth
                                required
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                margin="normal"
                            />

                            <TextField
                                id="impact"
                                label="Impact"
                                fullWidth
                                multiline
                                rows={4}
                                required
                                value={impact}
                                onChange={(event) => {
                                    const enteredValue = event.target.value;
                                    if (!isNaN(enteredValue)) {
                                        setImpact(enteredValue);
                                    }
                                }}
                                margin="normal"

                            />

                            <TextField
                                id="repository"
                                label="Repository"
                                fullWidth
                                required
                                value={bitbucket}
                                onChange={(event) => setTitle(event.target.value)}
                                margin="normal"
                            />
                            
                            <TextField
                                id="Tags"
                                label="Tags"
                                fullWidth
                                required
                                onChange={(event) => setTitle(event.target.value)}
                                margin="normal"
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                <Button variant="contained" onClick={() => setIsOpen(false)} sx={{ mr: 2 }}>
                                    Cancel
                                </Button>

                                <Button type="submit" variant="contained" color="primary">
                                    Save
                                </Button>

                            </Box>
                        </form>
                    </Box>
                </Modal>
            )}
        </>
    );
}
