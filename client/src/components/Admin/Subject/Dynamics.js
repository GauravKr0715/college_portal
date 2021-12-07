import React, { useState } from "react";
import "../Section/SectionCreate.css"

function Dynamic() {
  const [inputList, setInputList] = useState([{  SubjectName: "ADBA", Type: "Lecture"  }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { SubjectName: "", Type: "" }]);
  };

  return (
    <div >
    
      {inputList.map((x, i) => {
        return (
          <div className="boxs">
          <div>
          <label htmlFor="SubjectName">Subject Name: </label>
               
            <input value=
             
              {x.SubjectName} placeholder="Subject Name..."
              style={{marginRight:25}}
              
            />
           
              </div>
            <div>
            <label htmlFor="Type">Type: </label>
            <select  className="sel">
            <option>
              Lecture
              </option>
              <option>
              Lab
              </option>
              <option>
              Tutorial
              </option>

            </select>
            </div>
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button className="add" onClick={handleAddClick}>ADD</button>}
            </div>
          </div>
        );
      })}
    
    </div>
  );
}

export default Dynamic;