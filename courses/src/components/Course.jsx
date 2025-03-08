import Part from "./Part";
import { useState } from "react";

const Course = ({ courses }) => {
  //   let a = 0;
  //   course.parts.map((part) => (a = a + part.exercises));
  return (
    <div>
      {courses.map((course) => {
        let courseTotal = course.parts.reduce(
          (sum, part) => sum + part.exercises,
          0
        );
        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            {course.parts.map((part) => (
              <Part key={part.id} part={part} />
            ))}
            <p style={{ fontWeight: "bold" }}>
              total of {courseTotal} exercises
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
