import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";

export function BrGeneralInfo() {
  return (
    <Accordion style={{ width: "100%" }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Allgemeine Konstruktionshinweise</Accordion.Header>
        <Accordion.Body className="p-0">
          <ListGroup as="ol">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Verankerung am Endauflager</div>
                Am frei drehbaren oder schwach eingespannten Endauflager muss
                eine Bewehrung zur Aufnahme der Randzugkraft ausreichend
                verankert sein. <br />
                Fsd,R = VEd · (al / z) + NEd ≥ VEd / 2 <br />
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                Bis zum Endauflager sind mindestens 25 % der Feldbewehrung zu
                führen und dort zu verankern.
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                Erforderliche Verankerungslängen beachten.
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Konstruktive Einspannbewehrung</div>
                Zur Aufnahme einer rechnerisch nicht berücksichtigten
                Einspannung ist eine geeignete Bewehrung anzuordnen. Die
                Querschnitte der Endauflager sind dann für ein Stützmoment zu
                bemessen, das mindestens 25 % des benachbarten Feldmoments
                entspricht. Die Bewehrung muss, vom Auflageranschnitt gemessen,
                mindestens über 0,25 l des Endfeldes eingelegt werden.
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Ausgelagerte Bewehrung</div>
                Die Zugbewehrung sollte bei Plattenbalken- und bei
                Hohlkastenquerschnitten höchstens auf einer Breite bis zur
                halben rechnerischen Gurtbreite b*eff,i = 0,2 bi + 0,1 l0 &lt;
                0,2 l0 neben den Stegen angeordnet werden; die tatsächlich
                vorhandene Gurtbreite bi darf dabei für die Bewehrungsverteilung
                ausgenutzt werden.
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
