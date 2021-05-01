// Начальные значения карточек
// Массив используется, если данные не загрузились с сервера

const peterhofImage4 = new URL('../images/photo-grid-peterhof-4.jpg', import.meta.url);
const peterhofImage3 = new URL('../images/photo-grid-peterhof-3.jpg', import.meta.url);
const peterhofImage1 = new URL('../images/photo-grid-peterhof-1.jpg', import.meta.url);
const oranienbaumImage = new URL('../images/photo-grid-oranienbaum-1.jpg', import.meta.url);
const alexandriaImage = new URL('../images/photo-grid-aleksandria.jpg', import.meta.url);
const peterhofImage = new URL('../images/photo-grid-peterhof.jpg', import.meta.url);


export const initialCards = [
  { title: 'Петергоф', link: peterhofImage4, likes: [], owner: 0, id: 1 },
  { title: 'Петергоф', link: peterhofImage3, likes: [], owner: 0, id: 2 },
  { title: 'Петергоф', link: peterhofImage1, likes: [], owner: 0, id: 3 },
  { title: 'Ораниенбаум', link: oranienbaumImage, likes: [], owner: 0, id: 4 },
  { title: 'Парк Александрия', link: alexandriaImage, likes: [], owner: 0, id: 5 },
  { title: 'Петергоф', link: peterhofImage, likes: [], owner: 0, id: 6 }
];

