import React from 'react'
import "./style.css"

function Video({ sample }) {
   // console.log("sampl in video ", sample)
  return (
    <div className='videoBox'>
      <video key={sample} className="videoTag" autoPlay loop muted>
        <source src={sample} type="video/mp4" />
        </video>
        </div>
  )
}

export default Video