import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import { get } from 'axios'
import './App.css'

function App () {
  const fetchImages = async () => {
    const response = await get('http://picsum.photos/v2/list?limit=7')
    const ids = response.data.map(image => Number(image.id))

    const cardImages = [false]
    for (const id of ids) {
      cardImages.push(id)
      cardImages.push(id)
    }

    for (let i = cardImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[cardImages[i], cardImages[j]] = [cardImages[j], cardImages[i]]
    }

    setCardImages(cardImages)
  }

  const onFlip = id => {
    if (flippedCardIds[0] === id) {
      return
    }

    if (flippedCardIds.length === 0) {
      setFlippedCardIds([id])
    } else {
      const cardImageId = cardImages[id]
      const match = cardImages[flippedCardIds[0]] === cardImageId
      if (match) {
        setFlippedCardIds([])
        setMatchedCardIds([...matchedCardIds, id, flippedCardIds[0]])
      } else {
        setFlippedCardIds([flippedCardIds[0], id])
        setWrong(true)
      }
    }
  }

  const onLoad = () => {
    setLoadImages(loadedImages + 1)
  }

  const onShakeEnd = () => {
    setFlippedCardIds([])
    setWrong(false)
  }

  const [cardImages, setCardImages] = useState([])
  const [loadedImages, setLoadImages] = useState(0)
  const [matchedCardIds, setMatchedCardIds] = useState([])
  const [flippedCardIds, setFlippedCardIds] = useState([])
  const [wrong, setWrong] = useState(false)

  useEffect(() => {
    fetchImages()
  }, [])

  const cards = cardImages.map((cardImage, index) => (
    <Card
      key={index}
      flip={onFlip}
      id={index}
      imageId={cardImage}
      loaded={onLoad}
      canFlip={!wrong}
      flipped={flippedCardIds.includes(index) || matchedCardIds.includes(index)}
      wrong={wrong}
      onShakeEnd={onShakeEnd}
      matched={matchedCardIds.includes(index)}
    />
  ))
  const loading = loadedImages !== 14

  return (
    <div className='app'>
      <div
        style={{
          display: loading ? 'flex' : 'none',
          flexFlow: 'column',
          alignItems: 'center'
        }}
      >
        <div className='loader'></div>
        <div>loading images</div>
      </div>
      <div className='cards' style={{ display: loading ? 'none' : 'flex' }}>
        {cards}
      </div>
      <div
        className='finished'
        style={{ display: matchedCardIds.length === 14 ? 'flex' : 'none' }}
      >
        Congratulations!
      </div>
    </div>
  )
}

export default App
