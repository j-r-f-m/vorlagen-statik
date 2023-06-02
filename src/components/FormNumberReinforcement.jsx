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
                Gebe die vorhandene Stegbreite in cm an!
              </div>
            )}
          </div>

          {/* cnom */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <MathJax>{"\\(c_{nom,sw} \\)"}</MathJax>
            </InputGroup.Text>
            <Form.Control
              placeholder="Durchmesser Bügel"
              aria-label="Durchmesser Bügel"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text id="basic-addon1">
              <MathJax>{"\\([cm] \\)"}</MathJax>
            </InputGroup.Text>
          </InputGroup>

          {/* theta_bügel */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <MathJax>{"\\(\\theta_{sw} \\)"}</MathJax>
            </InputGroup.Text>
            <Form.Control
              placeholder="Durchmesser Bügel"
              aria-label="Durchmesser Bügel"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text id="basic-addon1">
              <MathJax>{"\\([cm] \\)"}</MathJax>
            </InputGroup.Text>
          </InputGroup>

          {/* theta_stab */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <MathJax>{"\\(\\theta_{sl} \\)"}</MathJax>
            </InputGroup.Text>
            <Form.Control
              placeholder=" Durchmesser Längsstäbe "
              aria-label="Durchmesser Längsstäbe"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text id="basic-addon1">
              <MathJax>{"\\([cm] \\)"}</MathJax>
            </InputGroup.Text>
          </InputGroup>

          {/* a */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <MathJax>{"\\(a \\)"}</MathJax>
            </InputGroup.Text>
            <Form.Control
              placeholder="Abstand Stäbe"
              aria-label="Abstand Stäbe"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text id="basic-addon1">
              <MathJax>{"\\([cm] \\)"}</MathJax>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
        {/* ---------------------------- Output -------------------------- */}
      </Form>
    </>
  );
}
