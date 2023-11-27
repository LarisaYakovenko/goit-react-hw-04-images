import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from '../services/apiService';
import { Searchbar } from './Searchbar/Searchbar';
import { AppStyle } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const paramsForNotify = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '24px',
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };
  const openModal = url => {
    setUrl(url);
  };

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);

    getImages({ query, page })
      .then(data => {
        setImages(prevState => [...prevState, ...data.hits]);
        const totalPages = Math.ceil(data.totalHits / 12);
        if (page < totalPages) {
          setIsLoadMore(true);
        }
        if (!data.totalHits) {
          return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
            paramsForNotify
          );
        }
      })
      .catch(error => {
        Notify.failure(
          'Oops! Something went wrong! Try reloading the page or make another choice!',
          paramsForNotify
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  return (
    <AppStyle>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} openModal={openModal} />
      {url && <Modal closeModal={openModal} url={url} />}
      {isLoadMore && <Button onClick={() => handleLoadMore()} />}
    </AppStyle>
  );
};
