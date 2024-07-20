
import React, { useEffect, useState } from 'react';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notifier } from 'components/Notifications';
import { useNavigate } from 'react-router-dom';

export default function AjoutService(props) {
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [...images, ...files];
    const newPreviewUrls = [...previewUrls, ...files.map(file => URL.createObjectURL(file))];

    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviewUrls = previewUrls.filter((_, i) => i !== index);

    setImages(updatedImages);
    setPreviewUrls(updatedPreviewUrls);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    const apiUrl = 'https://api.pcs.fr/services/ajout';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        notifier('success', `Demande crée avec succes`);
        navigate('/services');
      } else {
        console.error('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (<>
  <div className="page-title" style={{textAlign:"center"}}>
    Nouvelle demande de service
  </div>
    {/* <img
      src="/public/images/IPSEC_GRE-1721471918169.png"
      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
    /> */}
    <form class="formulaire">
      <div>
        <label>Titre du service</label>
        <input name="titre" type="text" placeholder="Titre"/>
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" type="text" style={{width: "100%", height: "170px"}} placeholder="Details de la préstation"/>
      </div>
      <div>
        <label for="">Adresse</label>
        <input  name="titre" type="text" placeholder="Lieu de la prestation"/>
      </div>
      <div>
        <label>Contact</label>
        <input name="titre" type="text" placeholder="Tel / Email"/>
      </div>
      <div>
        <label htmlFor="file-upload" style={{cursor: "pointer", display: 'block', marginBottom: '20px' }}>
          Images <FontAwesomeIcon icon={all.faAdd} style={{cursor: "pointer", fontSize: '17px', color: 'rgba(100,110,160,0.8)', marginTop: "15px"}}/>
        </label>
        <input
          id="file-upload"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {previewUrls.map((url, index) => (
            <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
              <img
                src={url}
                alt={`Preview ${index}`}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  textAlign: 'center',
                  lineHeight: '20px',
                  cursor: 'pointer'
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
  
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div>
          <input type="submit" onClick={handleSubmit} value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Créer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/>
        </div>
      </div>
      <br/>
      <br/>
    </form>
  </>)
}