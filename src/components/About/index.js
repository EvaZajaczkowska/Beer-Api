import React from "react";
import "./style.css";

function About(props)  {
    return (<div> 
      <form className="frm" onSubmit={props.searchFood}>
       Search Food :
       <input />
      <input type="submit" />
    </form>
   <ul className="nav-link">
    {props.items.map(item => (
   <div className="rsl" key={item.id}>   
      <li>
        {item.tagline}
      </li>
      <li>Name: {item.name}</li> 
      <img src={item.image_url} alt=""></img>
      </div>
    ))}
  </ul>
    </div>)
}

export default About;
