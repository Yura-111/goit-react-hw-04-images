import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { pixabayApi } from 'components/pixabayApi/pixabayApi';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { AppStyled } from './App.styled';
import { ImgSkeleton } from 'components/ImgSkeleton/ImgSkeleton';


    export const App = () => {
      const [searchQuerry, setSearchQuerry] = useState('');
      const [page, setPage] = useState(1);
      const [images, setImages] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
      const [isMoreBtnHide, setIsMoreBtnHide] = useState(false);
    
      useEffect(() => {
        if (!searchQuerry) {          
          return;
        } else {
          loderControlTogle()
          pixabayApi(searchQuerry, page)
            .then(data => {
              if (data.hits.length < 12) {
                setIsMoreBtnHide(true);
              }
              const filteredImages = data.hits.map((elements) => {
                const { id, webformatURL, largeImageURL, tags } = elements;
                const renderImages = { id, webformatURL, largeImageURL, tags };

                return renderImages;
              });
    
              if (data.total === 0) {
                setIsLoading(false);
                return toast.info('Sorry, nothing was found for your search');
              }
    
              setImages(images => [...images, ...filteredImages]);
    

              setIsLoading(false);
            })
            .catch(error => {
              console.log(error);
              setError(error);
            });
        }
      }, [searchQuerry, page]);

      const loderControlTogle = () => {
          setIsLoading(!images.isLoading)
      };
    
    
      const handleSubmit = searchQuerry => {
        setSearchQuerry(searchQuerry);
        setPage(1);
        setImages([]);
        setIsMoreBtnHide(false);
      };
    
      const handleMoreSearch = () => {
        setPage(page => page + 1);
      };

    return (
      <>
        <SearchBar onSubmit={handleSubmit}
            isLoading={isLoading}
            searchQuerry={searchQuerry}>          
        </SearchBar>
        {error && <p>Ups! Something went wrong!</p>}
        {images.length > 0 && (
          <ImageGallery images={images} />
          )}
        {isLoading && (
          <AppStyled>
            <ImgSkeleton/>
          </AppStyled>
        )}
        {images.length > 0 && !isLoading && !isMoreBtnHide && (
          <Button text="Load More" onClick={handleMoreSearch} />
        )}        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
