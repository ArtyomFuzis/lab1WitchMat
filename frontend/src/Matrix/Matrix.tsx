import "./Matrix.css"
import React from "react";
interface MatSize {
    xSize: number;
    ySize: number;
}
function create_matrix(){
    const matrix = Array(20)
    for (let i = 0; i < 20; i++) {
        matrix[i] = new Array(20).fill(0)
    }
    return matrix;
}
function Matrix(props: MatSize) {
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
                                            value={state.matrix[indexRow][indexColumn]}
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
                <button className="matrix-control-button matrix-button-reset" onClick={() =>{
                    setState({matrix: create_matrix()})
                }}>Очистить</button>
                <button className="matrix-control-button matrix-button-file">Из файла</button>
                <button className="matrix-control-button matrix-button-send">Отправить</button>
            </div>
        </div>
    )
}

export default Matrix;