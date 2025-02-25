import {useState} from "react";
import "./Body.css"
import Matrix from "../Matrix/Matrix.tsx";
import OutMatrix from "../OutMatrix/Matrix.tsx";
import OutVector from "../OutVector/Matrix.tsx";
function Body() {
    const [state, setState] = useState({
        xSize: 4,
        ySize: 3,
        res: {}
    })
    function changeResult(res_matrix){
        setState({...state,res: res_matrix})
    }
    function changeSizes(xSize: number, ySize: number){
        setState({...state,xSize, ySize})
    }
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
                <Matrix xSize={state.xSize} ySize={state.ySize} setRes={changeResult} setSizes={changeSizes}/>
            </div>
            { state.res.Status ? <div className="res-pane">
                <h3>Результат:</h3>
                <div className="res-box">
                    <h4>{state.res.DeterminantCalculated ? `Детерминант: ${state.res.Determinant}` : "Детерминанта нет"}</h4>
                    <h4>{state.res.SolutionsType == "one" && "Система линейных уравнений имеет одно решение"}</h4>
                    <h4>{state.res.SolutionsType == "none" && "Система линейных уравнений не имеет решений"}</h4>
                    <h4>{state.res.SolutionsType == "infinity" && "Система линейных уравнений имеет бесконечное количество решений"}</h4>
                    {state.res.Triangle && <span><h4>Треугольная матрица: </h4><OutMatrix matrix={state.res.Triangle}/></span>}
                    {state.res.X && <span><h4>Решения:</h4><OutVector matrix={state.res.X}/></span>}
                    {state.res.Discrepancy && <span><h4>Невязки:</h4><OutVector matrix={state.res.Discrepancy}/></span>}
                </div>
            </div> : null}
        </div>
    )
}

export default Body