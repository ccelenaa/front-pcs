import React, { useState } from 'react';
import Modal from 'react-modal';

export default function ModalImage(modal) {
    return (
        <>
            <Modal
                isOpen={modal.isOpen}
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => modal.close()}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        padding: 0
                    },
                    content: {
                        border: 0,
                        margin: 0,
                        backgroundColor: 'white',
                        backgroundImage: 'url(' + modal.url +')',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }
                }}>
                    <div>
                    </div>
            </Modal>
        </>
    )
}