import React from "react";
import './ProblemList.css';

const problemsData = [
  { id: 215, name: "Two Sums", topic: "Arrays", difficulty: "Medium" },
  { id: 216, name: "Two Sums", topic: "Arrays", difficulty: "Medium" },
  { id: 217, name: "Two Sums", topic: "Arrays", difficulty: "Medium" },
  { id: 218, name: "Two Sums", topic: "Arrays", difficulty: "Medium" },
  { id: 219, name: "Two Sums", topic: "Arrays", difficulty: "Medium" },
  { id: 220, name: "Two Sums", topic: "Arrays", difficulty: "Medium" },
  { id: 221, name: "Two Sums", topic: "Arrays", difficulty: "Medium" },
  { id: 222, name: "Two Sums", topic: "Arrays", difficulty: "Medium" },
  { id: 223, name: "Two Sums", topic: "Arrays", difficulty: "Medium" },
  { id: 224, name: "Two Sums", topic: "Arrays", difficulty: "Medium" },
  
];

const ProblemList = () => {
  return (
    <div className="problem-list-container">
      <div className="vertical-line">
      <h2 className="problem-list-title">Problems</h2>
      <table className="problem-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Topic</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {problemsData.map((problem, index) => (
            <tr key={index}>
              <td>{problem.id}</td>
              <td>{problem.name}</td>
                <td id="problem-topics">{problem.topic}</td>
              <td className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                {problem.difficulty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ProblemList;
