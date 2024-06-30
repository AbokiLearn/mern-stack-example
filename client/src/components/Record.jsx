import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Record = React.memo(function Record(props) {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/record/${id}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    } finally {
      setForm({ name: "", position: "", level: "" });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3>Create/Update Employee Record</h3>
      <form onSubmit={onSubmit} className="form-body">
        <div className="form-grid">
          <div className="form-column-left">
            <h2>
              Employee Info
            </h2>
            <p className="section-description">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="form-fields">
            <div>
              <label htmlFor="name" className="field-label">
                Name
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="input-field"
                  placeholder="First Last"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="position" className="field-label">
                Position
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="position"
                  id="position"
                  className="input-field"
                  placeholder="Developer Advocate"
                  value={form.position}
                  onChange={(e) => updateForm({ position: e.target.value })}
                />
              </div>
            </div>
            <div>
              <fieldset className="position-options">
                <legend className="option-legend">Position Options</legend>
                <div className="option-wrapper">
                  <input
                    id="positionIntern"
                    name="positionOptions"
                    type="radio"
                    value="Intern"
                    className="option-input"
                    checked={form.level === "Intern"}
                    onChange={(e) => updateForm({ level: e.target.value })}
                  />
                  <label htmlFor="positionIntern" className="option-label">
                    Intern
                  </label>
                  <input
                    id="positionJunior"
                    name="positionOptions"
                    type="radio"
                    value="Junior"
                    className="option-input"
                    checked={form.level === "Junior"}
                    onChange={(e) => updateForm({ level: e.target.value })}
                  />
                  <label htmlFor="positionJunior" className="option-label">
                    Junior
                  </label>
                  <input
                    id="positionSenior"
                    name="positionOptions"
                    type="radio"
                    value="Senior"
                    className="option-input"
                    checked={form.level === "Senior"}
                    onChange={(e) => updateForm({ level: e.target.value })}
                  />
                  <label htmlFor="positionSenior" className="option-label">
                    Senior
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Employee Record"
          className="submit-button"
        />
      </form>
    </>
  );
});

export default Record;
