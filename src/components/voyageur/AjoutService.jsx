
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logout, setConnexion, isConnected } from '../../services/user';
import { API_URL } from '../../Config';
import { useHistory, Link, NavLink } from 'react-router-dom';
import AsideSetting from '../aside/Settings';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AjoutService(props) {
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(images);
  };

  return (<>
    <form class="formulaire">
      <div>
        <label>Titre du service</label>
        <input name="titre" type="text" value=""  placeholder=""/>
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" type="text" style={{width: "100%", height: "170px"}} value="" placeholder="Details de la préstation"/>
      </div>
      <div>
        <label for="">Adresse</label>
        <input  name="titre" type="text" placeholder="Lieu de la prestation"/>
      </div>
      <div>
        <label>Contact</label>
        <input name="titre" type="text" value="" placeholder="Tel / Email"/>
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
                  top: '0',
                  right: '0',
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
                &times;
              </button>
            </div>
          ))}
        </div>
  
      </div>
      <div>
        <input type="submit" value="Sauvegarder" />
      </div>
      <br/>
      <br/>
    </form>
  </>)
}