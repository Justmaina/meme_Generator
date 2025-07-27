import { useEffect, useState } from 'react'
import './app.css'

function App() {
  const [memeProperties, setMemeProperties] = useState({
    textOne: "",
    textTwo: "",
    memeImage: ""
  })

  const [allMemes, setAllMemes] = useState([])

  useEffect (() => {
    async function getMemes() {
      try {
        const res = await fetch('https://api.imgflip.com/get_memes');
        const data = await res.json();
        setAllMemes(data.data.memes)
        setMemeProperties (prev => ({
          ...prev,
          memeImage: data.data.memes[0].url
        }))
    }catch(error) {
      console.log("Couldn't fetch the memes")
    }
  }
  getMemes();
}, [])

  function getRandomImage () {
    const randomIndex = Math.floor(Math.random() * allMemes.length)
    const randomMeme = allMemes[randomIndex]
    setMemeProperties (prev => ({
      ...prev,
      memeImage: randomMeme.url
    }))
  }


  function updateText (event) {
    const {name, value} = event.target
    setMemeProperties (prev => ({
      ...prev,
      [name]: value
    }))
  }


  return (
   <div className='container'>
    <input 
      type='text'
      placeholder='Text #1'
      name='textOne'
      value={memeProperties.textOne}
      onChange={updateText}
      className="meme-input"

    ></input>
    <input
      type='text'
      placeholder='Text #2'
      name='textTwo'
      value={memeProperties.textTwo}
      onChange={updateText}
      className="meme-input"
    ></input>
    {memeProperties.memeImage && (
    <div className="meme-container">
      <img src={memeProperties.memeImage} alt="Meme" className="meme-img" />
      <h2 className="meme-text top">{memeProperties.textOne}</h2>
      <h2 className="meme-text bottom">{memeProperties.textTwo}</h2>
    </div>
  )}
    <button onClick = {getRandomImage} className='meme-button'>Get a new Image</button>
    <button className='meme-button' >Share</button>
   </div>
  )
}

export default App
