import React from 'react';

export default function(props){
  if(!props.que.length) {
    return <h5>Looking for available pets...</h5>
  } else {
    const pets=props.que.map((v,i)=>(
      <li key={i}>
        <img 
          src={v.imageURL} 
          alt={v.imageDescription}
          className={v.adopter?"adopted":null} 
        />
      </li>
    ))
    return (
      <ul className="petQue">
        {pets}
      </ul>
    )
  }
}
