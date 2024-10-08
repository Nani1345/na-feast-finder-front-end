// npm modules
import { useState, useEffect } from "react"
import { useParams, NavLink } from "react-router-dom"

// services
import * as dishService from '../../services/dishService'

// css
import styles from './DishDetails.module.css'

//components
import NewReview from "../../components/NewReview/NewReview"
import Reviews from "../../components/Reviews/Reviews"

const DishDetails = (props) => {

  const { dishId } = useParams()
  const [dish, setDish] = useState(null)
  const handleAddReview = async (reviewFormData) => {
    const newReview = await dishService.createReview(dishId,reviewFormData)
    setDish({ ...dish, reviews: [newReview,...dish.reviews]})
  }

  useEffect(() => {
      const fetchDish = async () => {
        const dishData = await dishService.show(dishId)
        setDish(dishData)
      }
      fetchDish()
    }, [dishId])
  
  const handleDeleteReview= async (reviewId)=>{
    const updatedDish = await dishService.deleteReview(dishId,reviewId)
    setDish(updatedDish)
  }

  if(!dish) return <p>LOADING...</p>

  return (
  <main className={styles.container}>
    <article className={styles.info}>
      <div className={styles.details}>
        {dish.photo ? 
          <div className={styles.picture}><img src={dish.photo} alt="Dish Image" /></div>
          : null
        }
        <h1>{dish.name}</h1>
        <h2>Restaurant: {dish.restaurant?.name}</h2>
        <h2>Price: ${dish.cost}</h2>
      </div>
      <div className={styles.controls}>
        {props.user?.profile===dish.owner._id &&
          <>
            <NavLink to={`/dishes/${dishId}/edit`} state={dish}>
              <button><i className="fa-solid fa-pencil" alt="Edit Pencil"></i></button>
            </NavLink>  
            <button onClick={() => props.handleDeleteDish(dishId)}><i className="fas fa-trash" alt="Delete Trash Can"></i></button>
          </>
        }
      </div>
    </article>
    <section className={styles.reviews}>
      <h5>{dish.reviews.length} reviews</h5>
      <NewReview handleAddReview={handleAddReview}/>
      <Reviews dishId={dishId} reviews={dish.reviews} user={props.user} handleDeleteReview={handleDeleteReview}/>
    </section>
  </main>
  )
}

export default DishDetails