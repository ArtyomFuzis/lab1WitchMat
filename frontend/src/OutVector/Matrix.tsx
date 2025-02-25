import "./Matrix.css"
import React from "react";

interface MatProps {
    matrix
}

function getval(indexRow: number, matrix) {
    if (matrix == undefined) return 0
    return matrix[indexRow]
}

function print_only_some_symbs(prestr, ln) {
    if (prestr === undefined) return undefined;
    const str = prestr.toString()
    if (str.length > ln) {
        return str.substr(0, ln - 3) + "..."
    }
    return str
}

function OutVector(props: MatProps) {
    return (
        <div className="matrix-pane">
            <table className="matrix">
                <tbody>

                        {props.matrix.map((row, indexRow = 0) => {
                            return (
                                <tr key={`${indexRow}`}>
                                    <td>
                                        <span className="matrix-input ">
                                            {
                                                getval(indexRow, props.matrix)
                                            }
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default OutVector;