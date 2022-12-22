import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Backdrop } from './Modal.styled';
import { AppStyled } from 'components/App.styled';

export const Modal = ({ onToggle, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEscPress);
    return () => {
      window.removeEventListener('keydown', handleEscPress);
    };
  });

  const handleEscPress = evt => {
    if (evt.code === 'Escape') {
      onToggle();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onToggle();
    }
  };
    return (
      <Backdrop onClick={handleBackdropClick}>
        <AppStyled boxShadow="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;">
          {children}
        </AppStyled>
      </Backdrop>);
    
  }

  Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onclose: PropTypes.func,
  };