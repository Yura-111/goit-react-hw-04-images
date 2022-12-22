import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import {
  StyledGalleryImage,
  StyledGalleryItem,
  ModalImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ( {webformatURL, largeImageURL, tags } ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <>
        <StyledGalleryItem onClick={() => setIsModalOpen(true)} >
          <StyledGalleryImage src={webformatURL} alt={tags} />
        </StyledGalleryItem>
        {isModalOpen && (
          <Modal onToggle={() => setIsModalOpen(false)}>
            <ModalImage src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    ) ;
  }


ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired
};
