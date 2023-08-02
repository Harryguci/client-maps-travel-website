import { useState, useEffect } from 'react';
import { Button, Form, FormControl, FormLabel } from 'react-bootstrap';
import '../Assets/SCSS/imageForm.scss';

export default function ImageForm({ location }) {
    const [description, setDescription] = useState("");
    const [fileState, setFileState] = useState();
    const [user, setUser] = useState("")
    const [locationState, setLocationState] = useState({ lat: location.lat, lng: location.lng })
    const [previewUrl, setPreviewUrl] = useState("");
    const handleAddFile = (e) => {
        try {
            setFileState(e.target.files[0]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (fileState && fileState.name) {
            setPreviewUrl(URL.createObjectURL(fileState));
            // document.querySelector(`input[type="file"]`).value = null;
        }

        return () => {
            if (fileState && fileState.name) {
                setPreviewUrl("");
                URL.revokeObjectURL(fileState);
            }
        }
    }, [fileState])

    return (
        <Form
            action='https://server-maps-travel-website.onrender.com/send-image'
            // action={`http://localhost:3001/send-image`} // test server
            method='POST'
            enctype="multipart/form-data"
            className='image-form'
        >
            <h2 className='text-center mb-4'>Thêm ảnh</h2>
            <div>
                <FormControl // disabled prettier
                    type="text"
                    name="user"
                    value={user}
                    placeholder='Your name'
                    onChange={e => setUser(e.target.value)}
                />
            </div>
            <div>
                <FormControl type="text" // disabled prettier
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div>
                <FormLabel className="custom-button">
                    <FormControl // disabled prettier
                        type="file"
                        name="image"
                        placeholder='Your image'
                        // value={}
                        onChange={handleAddFile}
                        accept="image/png, image/jpeg"
                    />
                    Add Image
                </FormLabel>
                {fileState && fileState.name && previewUrl &&
                    <div className='preview'>
                        <div className='thumbnail'>
                            <img src={previewUrl} alt='Harryguci' />
                        </div>
                    </div>}
            </div>
            <div className='d-none'>
                <FormControl // disabled prettier
                    type='text'
                    name='location_lat'
                    value={locationState.lat}
                    onChange={e => setLocationState({ lat: e.target.value, lng: locationState.lng })}
                />
                <FormControl // disabled prettier
                    type='text'
                    name='location_lng'
                    value={locationState.lng}
                    onChange={e => setLocationState({ lat: locationState.lat, lng: e.target.value })}
                />
            </div>
            <div>
                <Button type="submit">
                    Send
                </Button>
            </div>
        </Form>
    )
}