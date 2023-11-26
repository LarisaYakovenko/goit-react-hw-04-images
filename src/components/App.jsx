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
  // const [getImages, setGetImages] = useState([]);

  const handleLoadMore = () => {
    setPage(prevState => ({ page: prevState.page + 1 }));
  };

  const handleSubmit = query => {
    setQuery({ query });
    // setPage(1);
    // setImages([]);
    // console.log(query);

    // if (this.state.query === query) {
    //   return;
    // }

    // this.setState({ query, page: 1, images: [] });
  };
  const openModal = url => {
    setUrl({ url });
  };

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);

    getImages(query, page)
      .then(data => {
        setImages(prevState => ({
          images: [...prevState, ...data.hits],
        }));
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

// export class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     isLoadMore: false,
//     isLoading: false,
//     url: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;
//     if (query !== prevState.query || page !== prevState.page) {
//       this.setState({ isLoading: true, isLoadMore: false });
//       getImages(this.state)
//         .then(({ hits: photos, totalHits, hits }) => {
//           if (!photos.length) {
//             return Notify.failure(
//               'Sorry, there are no images matching your search query. Please try again.',
//               paramsForNotify
//             );
//           }

//           this.setState(prevState => ({
//             images: [...prevState.images, ...hits],

//             isLoadMore: page < Math.ceil(totalHits / 12),
//           }));
//         })
//         .catch(error => {
//           Notify.failure(
//             'Oops! Something went wrong! Try reloading the page or make another choice!',
//             paramsForNotify
//           );
//         })
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleSubmit = query => {
//     if (this.state.query === query) {
//       return;
//     }
//     this.setState({ query, page: 1, images: [] });
//   };

//   openModal = url => {
//     this.setState({ url });
//   };

//   render() {
//     const { images, isLoadMore, isLoading, url } = this.state;
//     return (
//       <AppStyle>
//         <Searchbar onSubmit={this.handleSubmit} />
//         {isLoading && <Loader />}
//         <ImageGallery images={images} openModal={this.openModal} />
//         {url && <Modal closeModal={this.openModal} url={url} />}
//         {isLoadMore && <Button onClick={() => this.handleLoadMore()} />}
//       </AppStyle>
//     );
//   }
// }
