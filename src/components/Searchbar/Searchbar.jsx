import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { IconButton } from 'components/IconButton/IconButton';
import { StyledBar, StyledForm, StyledInput, Styledlabel } from './Searchbar.styles';


export const SearchBar = ({ isLoading, onSubmit, searchQuerry }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = evt => {
    setSearchInput(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchInput.trim() === '') {
      toast.info('Please, enter your search term', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (searchQuerry === searchInput.trim()) {
      toast.info(
        `The images you requested ${searchQuerry} have already been found and displayed`,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setSearchInput('');

      return;
    }

    onSubmit(searchInput.trim());

    setSearchInput('');
  };
    return (
      <StyledBar>
        <StyledForm onSubmit={handleSubmit}>
          <Styledlabel htmlFor="search">Search</Styledlabel>
          <StyledInput
            onChange={handleInputChange}
            value={searchInput}
            name="search"
            autoComplete="off"
          ></StyledInput>
          <IconButton
            isLoading={isLoading}
            type="submit"
            aria-label="Search button"
            icon={<FaSearch size={24} />}
          ></IconButton>
        </StyledForm>
      </StyledBar>
    );
  }




SearchBar.propType = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  searchQuerry: PropTypes.string.isRequired,
};