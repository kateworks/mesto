import api from '../utils/api';
import userProfile from '../utils/profile';

// Постановка/снятие лайка
function likeCard(card) {
  const id = card.getCardId();
  const likeState = card.isLiked();
  const likes = card.getLikes();
  const user = userProfile.getUserID();

  const action = likeState ? 'удалить' : 'поставить';
  const likeFunc = likeState
    ? (cardId, cardLikes) => api.unlikeCard(cardId, cardLikes)
    : (cardId, cardLikes) => api.likeCard(cardId, cardLikes);

  // const newLikes = likes

  likeFunc(id, likes)
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => {
      console.log(`Невозможно ${action} лайк. Ошибка ${err}.`);
      card.setLikes(!likeState ? [{ id: user }] : []);
    })
    .finally(() => {
      card.setLikeGroup(user);
    });
}

export default likeCard;
