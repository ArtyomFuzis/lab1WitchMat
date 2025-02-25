import "./Matrix.css"
import React from "react";
interface MatProps {
    matrix
}
function getval(indexRow : number, indexCol: number, matrix){
    if (matrix == undefined) return 0;
    const preres = matrix[indexRow]
    if (preres == undefined){
        return 0;
    }
    return matrix[indexRow][indexCol];
}
function print_only_some_symbs(prestr, ln){
    if (prestr === undefined) return undefined;
    const str = prestr.toString()
    if (str.length > ln){
        return str.substr(0, ln-3) + "..."
    }
    return str
}
function OutMatrix(props: MatProps) {
    const matrix = Array(props.matrix.length)
    for (let i = 0; i < props.matrix.length; i++) {
        matrix[i] = new Array(props.matrix[0].length).fill(0)
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

                                        <span className="matrix-input ">
                                            {
                                                print_only_some_symbs(getval(indexRow, indexColumn,props.matrix),8)
                                            }
                                        </span>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default OutMatrix;