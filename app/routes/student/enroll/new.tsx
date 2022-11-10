import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { enrollCourse } from "~/api/student";

function validateStudentId(id: string) {
  if (id.length < 6) {
    return `Student id is not corrected format`;
  }
}
function validateCourseCode(name: string) {
  if (name.length < 6) {
    return `Course Code is not shorter`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    studentId: string | undefined;
    courseCode: string | undefined;
  };
  fields?: {
    studentId: string;
    courseCode: string;
  };
  message?: string;
  status?: string;
  error?: {
    message: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const studentId = form.get("studentId");
  const courseCode = form.get("courseCode");

  if (typeof studentId !== "string" || typeof courseCode !== "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { studentId, courseCode };
  const fieldErrors = {
    studentId: validateStudentId(studentId),
    courseCode: validateCourseCode(courseCode),
  };
  const hasErrors = Object.values(fieldErrors).some(
    (errorMessage) => errorMessage
  );
  if (hasErrors) {
    return badRequest({ fieldErrors, fields });
  }
  const response = await enrollCourse(fields);
  return json(response);
};

const inputClassName =
  "flex-auto p-4 block rounded-lg font-medium outline-none border border-transparent focus:border-green-500 focus:text-green-500";
export default function NewEnrollRoute() {
  const formData = useActionData<ActionData>();

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <div className="container mx-auto p-4">
      <Form method="post" className="grid space-y-4 py-4">
        {formData?.fieldErrors && formData.fieldErrors.courseCode ? (
          <em className="text-red-600">{formData.fieldErrors.courseCode}</em>
        ) : null}

        <div className="border border-gray-400 rounded-lg flex mb-4 shadow-lg">
          <input
            type="text"
            name="courseCode"
            placeholder="Enter course code..."
            className={inputClassName}
          />
        </div>

        {formData?.fieldErrors && formData.fieldErrors.studentId ? (
          <em className="text-red-600">{formData.fieldErrors.studentId}</em>
        ) : null}
        <div className="border border-gray-400 rounded-lg flex mb-4 shadow-lg">
          <input
            type="text"
            name="studentId"
            placeholder="Enter student id..."
            className={inputClassName}
          />
        </div>
        <button
          name="enroll"
          type="submit"
          className="bg-green-500 w-full font-medium text-white px-4 py-3 rounded-lg shadow-lg hover:bg-green-400"
          disabled={isCreating}
        >
          {isCreating ? "Enrolling..." : "Enroll"}
        </button>
      </Form>
      {formData?.error ? <p>{formData.error.message}</p> : null}
      {formData?.message ? <p>{formData.message}</p> : null}
    </div>
  );
}
