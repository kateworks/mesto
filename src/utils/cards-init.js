// Начальные значения карточек
// Массив используется, если данные не загрузились с сервера

import peterhofImage4 from '../images/photo-grid-peterhof-4.jpg';
import peterhofImage3 from '../images/photo-grid-peterhof-3.jpg';
import peterhofImage1 from '../images/photo-grid-peterhof-1.jpg';
import oranienbaumImage from '../images/photo-grid-oranienbaum-1.jpg';
import alexandriaImage from '../images/photo-grid-aleksandria.jpg';
import peterhofImage from '../images/photo-grid-peterhof.jpg';

export const initialCards = [
  { title: 'Петергоф', link: peterhofImage4, likes: [] },
  { title: 'Петергоф', link: peterhofImage3, likes: [] },
  { title: 'Петергоф', link: peterhofImage1, likes: [] },
  { title: 'Ораниенбаум', link: oranienbaumImage, likes: [] },
  { title: 'Парк Александрия', link: alexandriaImage, likes: [] },
  { title: 'Петергоф', link: peterhofImage, likes: [] }
];
