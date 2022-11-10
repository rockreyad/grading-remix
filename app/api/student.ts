type enrollInfo = {
  studentId: string;
  courseCode: string;
};

type returnType = {
  status: string;
  message: string;
  error?: {
    message: string;
  };
};

export async function enrollCourse(
  enrollDetails: enrollInfo
): Promise<returnType> {
  let { studentId, courseCode } = enrollDetails;
  let enrollInfo = {
    studentId,
    course: courseCode,
  };
  let response = await fetch("http://localhost:9090/enroll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrollInfo),
  });

  return response.json();
}

//View All Marks with cgpa For the Student
interface resultDetails {
  name: string;
  credit: string;
  marks: string;
}
export type ResultReturn = {
  status?: string;
  message?: {
    name: string;
    message: string;
  };
  cgpa?: string;
  details?: resultDetails[];
};

export async function getResult(studentId: string): Promise<ResultReturn> {
  const response = await fetch(`http://localhost:9090/grade/${studentId}`);

  return response.json();
}
