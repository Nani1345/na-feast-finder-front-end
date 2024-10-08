// assets
import profileIcon from '../../assets/icons/user-solid.svg'
// css
import styles from './OwnerInfo.module.css'

const OwnerInfo = ({ content }) => {
  const photo = content.owner?.photo ? content.owner.photo : profileIcon

  return (
    <div className={styles.container}>
      <img src={photo} alt="The user's avatar" />
      <section>
        <h4>{content.owner?.name}</h4>
      </section>
    </div>
  )
}

export default OwnerInfo