import React from 'react'
import classNames from 'classnames'
import './Card.css'

function Card (props) {
  const {
    id,
    flipped,
    imageId,
    flip,
    loaded,
    canFlip,
    onShakeEnd,
    wrong,
    matched
  } = props

  const onClick = () => {
    if (canFlip) {
      flip(id)
    }
  }

  const onAnimationEnd = () => {
    if (shaking) {
      onShakeEnd()
    }
  }

  const shaking = wrong && flipped && !matched

  const cardClass = classNames('card', { flipped }, { shaking }, { matched })
  return (
    <div
      className={cardClass}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
      onTransitionEnd={onAnimationEnd}
    >
      {imageId !== false ? (
        <img
          className='card-face'
          src={`http://picsum.photos/id/${imageId}/200/300`}
          onLoad={loaded}
        />
      ) : (
        <div className='card-face joker'></div>
      )}
      <div className='card-back'></div>
    </div>
  )
}

export default Card
