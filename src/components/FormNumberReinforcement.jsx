import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

import { MathJax } from "better-react-mathjax";

export function FormNumberReinforcement() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log("lol");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          {/* ---------------------------- inputs -------------------------- */}
          {/* stegbreite */}

          <div className="mb-3 ">
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\(b_{w,vor} \\)"}</MathJax>
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Stegbreite"
                aria-label="Stegbreite"
                aria-describedby="basic-addon1"
                {...register("Stegbreite", {
                  required: true,
                })}
              />
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\([cm] \\)"}</MathJax>
              </InputGroup.Text>
            </InputGroup>

            {errors.Stegbreite && (
              <div className="error-validation mt-1 ms-2 text-danger">
                Vorhandene Stegbreite in cm
              </div>
            )}
          </div>

          <div className="mb-3">
            {/* cnom */}
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\(c_{nom,sw} \\)"}</MathJax>
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Betondeckung Bügel"
                aria-label="Betondeckung Bügel"
                aria-describedby="basic-addon1"
                {...register("BetondeckungBügel", {
                  required: true,
                })}
              />
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\([cm] \\)"}</MathJax>
              </InputGroup.Text>
            </InputGroup>
            {errors.BetondeckungBügel && (
              <div className="error-validation mt-1 ms-2 text-danger">
                Betondeckung der Bügel in cm
              </div>
            )}
          </div>

          <div className="mb-3">
            {/* theta_bügel */}
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\(\\theta_{sw} \\)"}</MathJax>
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Durchmesser Bügel"
                aria-label="Durchmesser Bügel"
                aria-describedby="basic-addon1"
                {...register("DurchmesserBügel", {
                  required: true,
                })}
              />
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\([cm] \\)"}</MathJax>
              </InputGroup.Text>
            </InputGroup>
            {errors.BetondeckungBügel && (
              <div className="error-validation mt-1 ms-2 text-danger">
                Bügeldurchmesser in cm
              </div>
            )}
          </div>

          <div className="mb-3">
            {/* theta_stab */}
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\(\\theta_{sl} \\)"}</MathJax>
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder=" Durchmesser Längsstäbe "
                aria-label="Durchmesser Längsstäbe"
                aria-describedby="basic-addon1"
                {...register("DurchmesserLängsstäbe", {
                  required: true,
                })}
              />
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\([cm] \\)"}</MathJax>
              </InputGroup.Text>
            </InputGroup>

            {errors.DurchmesserLängsstäbe && (
              <div className="error-validation mt-1 ms-2 text-danger">
                Durchmesser der Längsstäbe in cm
              </div>
            )}
          </div>

          <div className="mb-3">
            {/* a */}
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\(a \\)"}</MathJax>
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Abstand Stäbe"
                aria-label="Abstand Stäbe"
                aria-describedby="basic-addon1"
                {...register("abstandStäbe", {
                  required: true,
                })}
              />
              <InputGroup.Text id="basic-addon1">
                <MathJax>{"\\([cm] \\)"}</MathJax>
              </InputGroup.Text>
            </InputGroup>
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
        {/* ---------------------------- Output -------------------------- */}
      </Form>
    </>
  );
}
