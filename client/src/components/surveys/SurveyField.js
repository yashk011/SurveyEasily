import React from 'react';

export default ({input ,label ,meta}) => {
    return <div> 
        <label> {label}</label>
         <input  {...input}/> 
         <div className="red-text" style={{marginBottom:'10px'}}>
             {meta.touched && meta.error}
          </div>   
     </div>
};