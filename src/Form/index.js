import React from 'react';

export const Form = ({ onSubmit, onClick}) => {
  function addInp(e){
    var inpEl = document.createElement("input");
    var trEl  = document.createElement("tr");
    var tdEl  = document.createElement("td");
    inpEl.type="text";
    inpEl.className="form-control todo-list";
    inpEl.placeholder="Todo";
    tdEl.appendChild(inpEl)
    trEl.appendChild(tdEl);
    e.target.previousElementSibling.firstElementChild.appendChild(trEl);
  }
  const formHandle =  (e) => {
    onSubmit(e);
    onClick();
  }
  return (
    <form onSubmit={(e) => {formHandle(e)}}>
      <table>
        <tbody>
        <tr>
          <td><input className="form-control" id="tarih" min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]} placeholder={new Date().toLocaleDateString()} type='date' required /></td>
        </tr>
        <tr>
          <td><input type="text" className="form-control todo-list" placeholder="Todo" required/></td>
        </tr>
        </tbody>
      </table>
      <div className='plus' onClick={(e) => addInp(e)}>+</div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          OK
        </button>
      </div>
    </form>
  );
};
export default Form;