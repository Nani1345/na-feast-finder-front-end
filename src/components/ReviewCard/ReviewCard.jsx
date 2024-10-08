//npm
import { NavLink } from "react-router-dom"

//components
import OwnerInfo from "../OwnerInfo/OwnerInfo"

//css
import styles from './ReviewCard.module.css'

// Import the fork SVG
import forkIcon from '../../assets/icons/fork.svg'

// components
import DateCard from "../DeteCard/DateCard"


const ReviewCard = ({ dishId, review, user, handleDeleteReview }) => {
  return (
    <article className={styles.container}>
      <header>
        <span>
          <OwnerInfo content={review} />
        </span>
        {review.owner._id === user.profile &&
          <div className={styles.controls}>
            <NavLink to={`/dishes/${dishId}/reviews/edit`} state={review}>
              <button><i className="fa-solid fa-pencil" alt="Edit Pencil"></i></button>
            </NavLink>
            <button onClick={() => handleDeleteReview(review._id)}>
              <i className="fas fa-trash" alt="Delete Trash Can"></i>
            </button>
          </div>
        }
      </header>
      <DateCard createdAt={review.createdAt} />
      <div className={styles.rating}>
        {Array(5).fill().map((_, index) => (
          <img
            key={index}
            src={forkIcon}
            alt="Fork Icon"
            className={index < review.rating ? styles.forkGold : styles.forkGray}
          />
        ))}
      </div>
      <h2>{review.comment}</h2>
    </article>
  );
};

export default ReviewCard
