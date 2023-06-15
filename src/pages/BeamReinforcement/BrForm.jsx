import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

import { MathJax } from "better-react-mathjax";
import {
  maxNumBars,
  dMin,
  sMin,
} from "../../calculations/maxNumberBars/maxNumberBars";

export function BrForm(props) {
  //const [result, setResult] = useState({ nStäbe: null });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(props);

    const iptB = Number(data.b);
    const iptCnomA = Number(data.cNomA);
    const iptCnomI = Number(data.cNomI);
    const iptThetaBügel = Number(data.thetaBügel);
    const iptTheta = Number(data.theta);

    // calculate n
    const calculatedN = maxNumBars(
      iptB,
      iptCnomA,
      iptCnomI,
      iptThetaBügel,
      iptTheta
    );

    const calculatedDmin = dMin(iptTheta);
    const calculatedSmin = sMin(iptTheta);

    console.log("hi");
    console.log(calculatedN);

    props.setDataChild(
      iptB,
      iptCnomA,
      iptCnomI,
      iptThetaBügel,
      iptTheta,
      calculatedN,
      calculatedDmin,
      calculatedSmin
    );

    // const minWidht = maxNumBars(cnom, thetaBügel, thetaLängs, nStäbe, aStäbe);
    // console.log(minWidht);
  };

  return (
    <>
      <h2 className="mt-4">Randbedingungen</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          {/* ---------------------------- inputs -------------------------- */}
          {/* stegbreite */}

          <div className="mb-3 ">
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\(b \\)"}</MathJax>
              </InputGroup.Text>
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Stegbreite"
                aria-label="Stegbreite"
                aria-describedby="basic-addon1"
                {...register("b", {
                  required: true,
                })}
              />
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\([cm] \\)"}</MathJax>
              </InputGroup.Text>
            </InputGroup>

            {errors.b && (
              <div className="error-validation mt-1 ms-2 text-danger">
                Vorhandene Stegbreite in cm
              </div>
            )}
          </div>

          <div className="mb-3">
            {/* cnom,a */}
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\(c_{nom,a} \\)"}</MathJax>
              </InputGroup.Text>
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Cnom,a"
                aria-label="Cnom,a"
                aria-describedby="basic-addon1"
                {...register("cNomA", {
                  required: true,
                })}
              />
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\([cm] \\)"}</MathJax>
              </InputGroup.Text>
            </InputGroup>
            {errors.cNomA && (
              <div className="error-validation mt-1 ms-2 text-danger">
                Betondeckung der Bügel außen
              </div>
            )}
          </div>

          <div className="mb-3">
            {/* cnom,außen */}
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\(c_{nom,i} \\)"}</MathJax>
              </InputGroup.Text>
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Cnom,i"
                aria-label="Cnom,i"
                aria-describedby="basic-addon1"
                {...register("cNomI", {
                  required: true,
                })}
              />
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\([cm] \\)"}</MathJax>
              </InputGroup.Text>
            </InputGroup>
            {errors.cNomI && (
              <div className="error-validation mt-1 ms-2 text-danger">
                Betondeckung der Bügel innen
              </div>
            )}
          </div>

          <div className="mb-3">
            {/* theta_bügel */}
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\(\\theta_{Bü} \\)"}</MathJax>
              </InputGroup.Text>
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Durchmesser Bügel"
                aria-label="Durchmesser Bügel"
                aria-describedby="basic-addon1"
                {...register("thetaBügel", {
                  required: true,
                })}
              />
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\([cm] \\)"}</MathJax>
              </InputGroup.Text>
            </InputGroup>
            {errors.thetaBügel && (
              <div className="error-validation mt-1 ms-2 text-danger">
                Bügeldurchmesser in cm
              </div>
            )}
          </div>

          <div className="mb-3">
            {/* theta_stab */}
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\(\\theta \\)"}</MathJax>
              </InputGroup.Text>
              <Form.Control
                type="number"
                step="0.1"
                placeholder=" Durchmesser Längsstäbe "
                aria-label="Durchmesser Längsstäbe"
                aria-describedby="basic-addon1"
                {...register("theta", {
                  required: true,
                })}
              />
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\([cm] \\)"}</MathJax>
              </InputGroup.Text>
            </InputGroup>

            {errors.theta && (
              <div className="error-validation mt-1 ms-2 text-danger">
                Durchmesser der Längsstäbe in cm
              </div>
            )}
          </div>

          <div className="mb-3">
            {errors.abstandStäbe && (
              <div className="error-validation mt-1 ms-2 text-danger">
                Abstand der Längsstäbe in cm
              </div>
            )}
          </div>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
      {/* ---------------------------- Output -------------------------- */}
    </>
  );
}
