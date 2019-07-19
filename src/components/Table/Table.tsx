import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Table.css';
// import Cell from  './component/cell';

interface IColumnItem {
    title: string;
    width: number;
    dataIndex: string;
}

interface IDataItem {
    key: number,
    date: string,
    amount: number,
    type: string,
    note: string
}

interface IDataArray extends Array<IDataItem>{}

interface IColumnArray extends Array<IColumnItem>{}

interface ITableProps { columns: IColumnArray; data: IDataArray }
interface ITableStates { columns: IColumnArray; data: IDataArray }


class Table extends React.Component<ITableProps, ITableStates>{
    constructor(props){
        super(props);
        this.state={...props };
    }

    handleDrag(index,event){
        // console.log(event.target.closest("th").getBoundingClientRect());
        // console.log("clientX", event.clientX);
        // console.log("right", event.target.closest("th").getBoundingClientRect().right);
        let width = (event.clientX - event.target.closest("th").getBoundingClientRect().right);
        event.target.height=1000
        if(event.target.closest("th").getBoundingClientRect().x > event.clientX  ) return;
        this.onTitleChange(index, width)
    }

    onTitleChange(indexNum, width) {
        var columns = [...this.state.columns];
        var index = columns.findIndex((obj,index) => index === indexNum);
        columns[index].width = columns[index].width +  width;
        this.setState({columns : columns});
    }

    render() {
        return (
        <table>
            <colgroup>
                {
                    this.state.columns.map((item,index)=>(
                        <col key={index} style={{width: (item.width) ? item.width : 100 }}/>
                    ))
                }
            </colgroup>
            <thead>
                <tr>
                    {
                        this.state.columns.map((item, index, array) => (
                            <th key={index}>
                                <span>{item.title}</span>
                                { (index < array.length-1) ? <span style={{backgroundColor:"red"}} className="resize-handle" onDrag={this.handleDrag.bind(this,index)} draggable={true}></span> : '' }
                            </th>

                        ))
                    }
                </tr>
            </thead>
            <tbody>
            {
                this.state.data.map((item)=>(
                    <tr key={item.key}>
                        <td><span>{item.date}</span></td>
                        <td><span>{item.amount}</span></td>
                        <td><span>{item.type}</span></td>
                        {/*<Cell value={item.type}/>*/}
                        {/*<td><span onClick={this.onHandleFocus}>{item.type}</span>*/}
                            {/*<input style={{border:0,outline:0,display:"none"}} value={item.type} onChange={ this.onHandleInputChange.bind(this,item.key)} type="text"/>*/}
                        {/*</td>*/}
                        {/*<td><span><input style={{border:0,outline:0}} type="text"/></span></td>*/}
                        <td><span>{item.note}</span></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        )
    }
}

export default Table;