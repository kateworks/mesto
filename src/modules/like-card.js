import api from '../utils/api';
import userProfile from '../utils/profile';

function like(card) {
  const userId = userProfile.getUserID();
  const cardId = card.getCardId();
  const isLiked = card.isLiked();
  const cardLikes = card.getLikes();

  const action = isLiked ? 'удалить' : 'поставить';

  const likeFunction = isLiked
    ? (id, likes) => api.unlikeCard(id, likes)
    : (id, likes) => api.likeCard(id, likes);

  const newLikes = isLiked
    ? cardLikes.filter((item) => item !== userId)
    : [...cardLikes, userId];

  likeFunction(cardId, newLikes)
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => {
      console.log(`Невозможно ${action} лайк. Ошибка ${err}.`);
      card.setLikes(newLikes);
    })
    .finally(() => {
      card.setLikeGroup(userId);
    });
}

export default like;
