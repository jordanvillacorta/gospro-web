import { useState } from 'react';
import { uploadPhoto } from '../api/api';

const PhotoUpload = ({ shopId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', file);
    await uploadPhoto(shopId, formData);
    alert('Photo uploaded successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default PhotoUpload;