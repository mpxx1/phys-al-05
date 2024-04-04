import './App.css'
import {useState} from "react";
import {Axis, Heading, Legend, LineSeries, Plot} from "react-plot";

type Point = {
    x: number,
    y: number,
}

function App() {

    const [inductance, setInductance] = useState("");
    const [resistance, setResistance] = useState("");
    const [emf, setEmf] = useState("");

    const f1 = (t: number, l: number, r: number, emf: number) => {
        return (1 - Math.exp(- (r / l) * t)) * (emf / r);
    }

    const f2 = (t: number, l: number, r: number, emf: number) => {
        return Math.exp(- (r / l) * t) * (emf / r);
    }

    const data1: Point[] = [];
    const data2: Point[] = [];


    const inductanceData = Number.parseFloat(inductance);
    const resistanceData = Number.parseFloat(resistance);
    const emfData = Number.parseFloat(emf);

    if (inductanceData > 0 && resistanceData > 0) {
        
        for (let i = 0; i < 10; i += 0.1) {
            data1.push({ x: i, y: f1(i, inductanceData, resistanceData, emfData) })
            data2.push({ x: i, y: f2(i, inductanceData, resistanceData, emfData) })
        }
    } else {
        alert("inductance and resistance must be >0")
    }


    return (
        <div className={"wrapper11"}>

            <div className={"inputWrapper11"}>
                <div>
                    <label> Enter values to see the plots </label>
                    <input
                        placeholder={"Inductance, H"}
                        value={inductance}
                        onChange={(event) => setInductance(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Resistance, Ω"}
                        value={resistance}
                        onChange={(event) => setResistance(event.target.value)}

                    />
                </div>

                <div>
                    <input
                        placeholder={"Emf, V"}
                        value={emf}
                        onChange={(event) => setEmf(event.target.value)}

                    />
                </div>
            </div>

            <div className={"Plots"}>

                <div className={"plot1"}>

                    <Plot
                        width={1200}
                        height={700}
                    >

                        <Heading
                            title={"Open"}
                        ></Heading>

                        <Axis
                            id="x"
                            position="bottom"
                            label="Time, Seconds"
                            displayPrimaryGridLines
                        />
                        <Axis
                            id="y"
                            position="left"
                            label="Current, Amperes"
                            displayPrimaryGridLines
                        />
                        <Legend position="right" />

                        <LineSeries
                            data={ data1 }
                            xAxis="x"
                            yAxis="y"
                            label={"Open"}
                            lineStyle={{ strokeWidth: 3 }}
                            displayMarkers={false}
                        />

                    </Plot>

                </div>

                <div className={"plot2"}>

                    <Plot
                        width={1200}
                        height={700}
                    >

                        <Heading
                            title={"Closed"}
                        ></Heading>

                        <Axis
                            id="x"
                            position="bottom"
                            label="Time, Seconds"
                            displayPrimaryGridLines
                        />
                        <Axis
                            id="y"
                            position="left"
                            label="Current, Amperes"
                            displayPrimaryGridLines
                        />
                        <Legend position="right" />

                        <LineSeries
                            data={ data2 }
                            xAxis="x"
                            yAxis="y"
                            label={"Closed"}
                            lineStyle={{ strokeWidth: 3 }}
                            displayMarkers={false}
                        />

                    </Plot>

                </div>

            </div>


        </div>
    )
}

export default App
