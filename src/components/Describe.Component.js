import MenuBar from "./MenuBar.Component";
import "./MenuBar.Component.css"
import "./MainField.Component.css"
import "./Describe.Component.css"

const Describe = () => {
    return (
        <>
            <div className='MainField'
            /* style={{ width: width, height: height }} */
            >
                <div className="dashBoard">
                    <div id="countDown" className="countDown">CountDown</div>
                    <div id="connectionFeedback" className="connectionFeedback">Connection Feedback</div>
                    <MenuBar />
                </div>
            </div>
            <div className="Describe">
                <h1>Játékmenet</h1>
                <ol>
                    <li>
                        <h3>
                            Állítsd be a jatékosok neveit.
                        </h3>
                    </li>
                    <li>
                        <h3>
                            Első játékos hajóinak lepakolása.
                        </h3>
                        <p>
                            A hajókat vízszintesen, vagy függőlegesen tudod lerakni.
                            Ha elkezdted egyik irányba, onnantól az egymást követő mezőkre kattintva jelöld ki a hajó teljes hosszát.
                            Az üzenőfalon mindig kapsz értesítést, melyik hajót kell éppen leraknod.
                            Amennyiben elrontottál valamit, nyugodtan frissítsd a oldalt, utána elölről kezdheted az összes hajó lerakását.
                        </p>
                    </li>
                    <li>
                        <h3>
                            Második játékos hajóinak lepakolása.
                        </h3>
                    </li>
                    <li>
                        <h3>
                            Csata indulása.
                        </h3>
                        <p>
                            Miután mindkét játékos lerakta a hajóit, indulhat a csata. A játékosok felváltva jelölik ki a kiválasztott mezőket.
                            Ha egy mezőn nem található hajó, kék színűvé válik.
                            Ha eltalált egy hajót, pirossá válik.
                            Amennyiben a hajó minden mezőjét eltalálta, bordó színű lesz minden mezője.
                        </p>
                    </li>
                    <li>
                        <h3>
                            Csata vége.
                        </h3>
                        <p>
                            Ha az egyik játékos elsüllyesztette az ellenfél összes hajóját, a játéknak vége.
                        </p>
                    </li>
                    <li>
                        <h3>
                            Hajók típusai:
                        </h3>
                        <ul>
                            <li>
                                <h4>
                                    1. Anyahajó:
                                </h4>
                                <p>
                                    Hossza: 4 egység
                                </p>
                                <img src="images/mothership_horizontal.png" alt="" />
                            </li>
                            <li>
                                <h4>
                                    2. Cirkáló:
                                </h4>
                                <p>
                                    Hossza: 3 egység
                                </p>
                                <img src="images/frigate_horizontal_216x72.png" alt="" />
                            </li>
                            <li>
                                <h4>
                                    3. Romboló:
                                </h4>
                                <p>
                                    Hossza: 2 egység
                                </p>
                                <img src="images/Arleigh_Burke-class_destroyer_horizontal_144x75.png" alt="" />
                            </li>
                            <li>
                                <h4>
                                    4. Fregatt:
                                </h4>
                                <p>
                                    Hossza: 2 egység
                                </p>
                                <img src="images/cruiser_horizontal_216x72.png" alt="" />
                            </li>
                        </ul>
                    </li>

                </ol>
            </div>
        </>
    );
}

export default Describe;