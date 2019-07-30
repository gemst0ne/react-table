import * as  React from "react";
import './Cell.css'


interface ICellProps { value: string | number }
interface ICellState { isFocused: boolean, value: string }

class Cell extends React.Component<ICellProps, ICellState>{
  state = {
    isFocused: false,
    value:'',
  };

  cellInput = null;

  static getDerivedStateFromProps = (nextProps, prevState) =>{
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
      return null;
  };

  onhandleClick = (e) => {
    this.setState({
      isFocused: true
    })
  };
  componentDidUpdate = ()=>{
    if(this.state.isFocused){
      this.cellInput.focus();
    }
  }
  onhandleBlur = (e:any ) => {
    this.setState({
      isFocused: false
      })
  };

  onhandleChange = (e:any) => {
      this.setState({
        value: e.target.value
      })
  }

  render(){
      console.log("update")
        return <td>
            <span style={{display: (this.state.isFocused ? "none":"block")}} onClick={this.onhandleClick}>
              {this.state.value}
            </span>
          <input ref={ref => {this.cellInput = ref}} onChange={this.onhandleChange} onBlur={this.onhandleBlur} style={{display: (this.state.isFocused ? "block":"none")}} type="text" value={this.state.value} />
        </td>
  }
}

export default Cell;