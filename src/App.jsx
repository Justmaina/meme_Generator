import { useEffect, useState } from 'react'

function App() {
  const [memeProperties, setMemeProperties] = useState({
    textOne: "",
    textTwo: "",
    memeImage: ""
  })

  useEffect (() => {
    async function getMemes() {
      try {
        const res = await fetch(' https://api.imgflip.com/get_memes');
        const data = await res.json();
        setMemeProperties(data)
    }catch(error) {
      console.log("Could fetch the memes")
    }
  }
}
)

  function updateText (event) {
    const {name, value} = event.target
    setMemeProperties (prev => ({
      ...prev,
      [name]: value
    }))
  }


  return (
   <div>
    <input 
      type='text'
      placeholder='Text #1'
      name='TextOne'
    >{updateText}</input>
    <input
      type='text'
      placeholder='Text #2'
      name='TextTwo'
    >{updateText}</input>
    <img
      src= {memeImage}
      alt='memeImage'
    ></img>
    <button>Get a new Image</button>
    <button>Share</button>
   </div>
  )
}

export default App
