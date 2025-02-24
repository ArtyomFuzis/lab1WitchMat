import {useState} from "react";
import "./Body.css"
import Matrix from "../Matrix/Matrix.tsx";
function Body() {
    const [state, setState] = useState({
        xSize: 4,
        ySize: 3
    })
    return (
        <div className="Body">
            <div className="upper-tab"></div>
            <div className="main-pane">
                <h3>Матрица: <span>
                    <input type="number" className="numChoose" min="1" max="20" value={state.ySize} onChange={(e) => {
                        let val = Number(e.target.value)
                        if (val < 1) val = 1
                        else if (val > 20) val = 20
                        setState({...state, ySize: val})
                    }}/>
                    x
                    <input type="number" className="numChoose" min="1" max="20" value={state.xSize} onChange={(e) => {
                        let val = Number(e.target.value)
                        if (val < 1) val = 1
                        else if (val > 20) val = 20
                        setState({...state, xSize: val})
                    }}/>
                </span></h3>
                <Matrix xSize={state.xSize} ySize={state.ySize} />
            </div>
        </div>
    )
}

export default Body