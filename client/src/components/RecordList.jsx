import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr className="table-row">
    <td className="table-data">
      {props.record.name}
    </td>
    <td className="table-data">
      {props.record.position}
    </td>
    <td className="table-data">
      {props.record.level}
    </td>
    <td className="table-data">
      <div className="button-group">
        <Link className="button" to={`/edit/${props.record._id}`}>
          Edit
        </Link>
        <button
          className="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:5050/record/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const records = await response.json();
        setRecords(records);
      } catch (error) {
        setError(`Failed to fetch records: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    getRecords();
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // This following section will display the table with the records of individuals.
  return (
    <>
      <h3>Employee Records</h3>
      <div className="records-wrapper">
        {records.length == 0 ? (
          <p>No records found</p>
        ) : (
          <table className="records-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        )}
      </div>
    </>
  );
}
