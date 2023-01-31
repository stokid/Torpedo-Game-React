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
                            A kijelölt négyzetek <span className="darkRed">bordó</span> színűvé bordó színűvé válnak.
                            Miután kijelölted az aktuális hajó teljes hosszát, üzenőfalon mindig kapsz értesítést, melyik a soron következő.
                            Ha az utolsó hajó pozícióját megadtad, add át a lehetőséget az ellenfelednek.
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
                            Ha egy mezőn nem található hajó, <span className="blue">kék</span> színűvé válik.
                            Ha eltalált egy hajót, <span className="darkGreen">zöldé</span> válik.
                            Amennyiben a hajó minden mezőjét eltaláltad, <span className="green">világosabb zöld</span> színű lesz minden mezője.
                        </p>
                    </li>
                    <li>
                        <h3>
                            Csata vége.
                        </h3>
                        <p>
                            Ha az egyik játékos elsüllyesztette az ellenfél összes hajóját, a játéknak vége.
                            Ezután a menüpontban tudsz új játékot indítani.
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
                                <img src="images/mothership_horizontal.png" alt="webgames-battleship-mothership" />
                            </li>
                            <li>
                                <h4>
                                    2. Cirkáló:
                                </h4>
                                <p>
                                    Hossza: 3 egység
                                </p>
                                <img src="images/frigate_horizontal_216x72.png" alt="webgames-battleship-frigate" />
                            </li>
                            <li>
                                <h4>
                                    3. Romboló:
                                </h4>
                                <p>
                                    Hossza: 2 egység
                                </p>
                                <img src="images/Arleigh_Burke-class_destroyer_horizontal_144x75.png" alt="webgames-battleship-destroyer" />
                            </li>
                            <li>
                                <h4>
                                    4. Fregatt:
                                </h4>
                                <p>
                                    Hossza: 2 egység
                                </p>
                                <img src="images/cruiser_horizontal_216x72.png" alt="webgames-battleship-cruiser" />
                            </li>
                        </ul>
                    </li>

                </ol>
            </div>
        </>
    );
}

export default Describe;