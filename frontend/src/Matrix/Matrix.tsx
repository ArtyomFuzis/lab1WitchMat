import "./Matrix.css"
import React from "react";
interface MatProps {
    xSize: number;
    ySize: number;
    setRes: (matrix_arr) => void;
    setSizes: (xSize: number, ySize: number) => void;
}
function create_matrix(){
    const matrix = Array(20)
    for (let i = 0; i < 20; i++) {
        matrix[i] = new Array(20).fill(0)
    }
    return matrix;
}
function getval(indexRow : number, indexCol: number, matrix){
    const preres = matrix[indexRow]
    if (preres == undefined){
        return 0;
    }
    return matrix[indexRow][indexCol];
}
function Matrix(props: MatProps) {
    const [state, setState] = React.useState({
        matrix: create_matrix()
    })
    const matrix = Array(props.ySize)
    for (let i = 0; i < props.ySize; i++) {
        matrix[i] = new Array(props.xSize).fill(0)
    }
    return (
        <div className="matrix-pane">
            <table className="matrix">
                <tbody>
                {matrix.map((row, indexRow = 0) => {
                    return (
                        <tr key={indexRow}>
                            {row.map((_: number, indexColumn = 0) => {
                                return (
                                    <td key={`${indexRow}_${indexColumn}`}>
                                        { indexColumn == 0 && <b className={"matrix-var-names"}>{`${indexRow}.  `}</b>}
                                        <input
                                            className="matrix-input number-to-text"
                                            type="number"
                                            value={getval(indexRow, indexColumn,state.matrix)}
                                            onChange={(e) => {
                                                const mat2 = state.matrix;
                                                mat2[indexRow][indexColumn] = Number(e.target.value)
                                                setState({matrix: mat2})
                                            }}
                                        />
                                        { indexColumn != props.xSize-1 && <span className={"matrix-var-names"}>{`x${indexColumn}`}</span>}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="matrix-control-pane">
                <button className="matrix-control-button matrix-button-reset" onClick={() => {
                    setState({matrix: create_matrix()})
                }}>Очистить
                </button>
                <button className="matrix-control-button matrix-button-send" onClick={() => {
                    const new_matrix = Object.create(state.matrix).slice(0, props.ySize)
                    for (let i = 0; i < props.ySize; i++) {
                        new_matrix[i] = new_matrix[i].slice(0, props.xSize)
                    }
                    fetch('/api/lab1', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({matrix: new_matrix})
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Сетевая ошибка')
                            }
                            return response.json()
                        })
                        .then(data => {
                            props.setRes(data)
                        })
                        .catch(error => console.error('Ошибка:', error))
                }}>Отправить
                </button>
                <input type='file' className="matrix-control-button matrix-button-file" onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = function () {
                        const parsed = JSON.parse(reader.result)["matrix"]
                        setState({...state, matrix:parsed})
                        props.setSizes(parsed[0].length, parsed.length)
                    }
                }}/>
            </div>
        </div>
    )
}

export default Matrix;