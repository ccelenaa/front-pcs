
import React, { useEffect, useState } from 'react';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notifier } from 'components/Notifications';
import { useNavigate } from 'react-router-dom';
import serviceBien from 'services/bien';

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

    const serviceForm = document.getElementById('service_form');
    const formData = new FormData(serviceForm);

    formData.delete('images');
    images.forEach((image, index) => {
      formData.append('images', image);
    });
  
    if(await serviceBien.add(formData)) {
      navigate("/biens");
    }
  };

  return (<>
  <div className="page-title">
    Ajout d'un nouveau bien
  </div>
    <form class="formulaire" id="service_form">
      <div>
        <label>Type du bien</label>
        <input name="type" type="text" placeholder="appartement, studio ..."/>
      </div>
      <div>
        <label>Titre</label>
        <input name="titre" type="text" placeholder="Titre"/>
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" type="text" style={{width: "100%", height: "170px"}} placeholder="Description du bien"/>
      </div>
      <div>
        <label for="">Superficie M2</label>
        <input  name="surface" type="text" placeholder="65m2"/>
      </div>
      <div>
        <label for="">Prix (jour)</label>
        <input  name="prix" type="text" placeholder="85"/>
      </div>
      <div>
        <label for="">Adresse</label>
        <input  name="adresse" type="text" placeholder="Adresse du bien"/>
      </div>
      <div>
        <label for="">Contact</label>
        <input name="contact" type="text" placeholder="Tel, email ..."/>
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