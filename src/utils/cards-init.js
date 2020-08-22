// Начальные значения карточек
// Массив используется, если данные не загрузились с сервера

import peterhofImage4 from '../images/photo-grid-peterhof-4.jpg';
import peterhofImage3 from '../images/photo-grid-peterhof-3.jpg';
import peterhofImage1 from '../images/photo-grid-peterhof-1.jpg';
import oranienbaumImage from '../images/photo-grid-oranienbaum-1.jpg';
import alexandriaImage from '../images/photo-grid-aleksandria.jpg';
import peterhofImage from '../images/photo-grid-peterhof.jpg';

export const initialCards = [
  { title: 'Петергоф', link: peterhofImage4, likes: [], owner: 0, id: 1 },
  { title: 'Петергоф', link: peterhofImage3, likes: [], owner: 0, id: 2 },
  { title: 'Петергоф', link: peterhofImage1, likes: [], owner: 0, id: 3 },
  { title: 'Ораниенбаум', link: oranienbaumImage, likes: [], owner: 0, id: 4 },
  { title: 'Парк Александрия', link: alexandriaImage, likes: [], owner: 0, id: 5 },
  { title: 'Петергоф', link: peterhofImage, likes: [], owner: 0, id: 6 }
];

