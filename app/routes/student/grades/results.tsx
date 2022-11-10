import { ActionFunction, json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { getResult, ResultReturn } from "~/api/student";

function validateStudentId(id: string) {
  if (id.length < 6) {
    return `Student id is not corrected format`;
  }
}
interface ActionData extends ResultReturn {
  formError?: string;
  fieldErrors?: {
    studentId: string | undefined;
  };
  fields?: {
    studentId: string;
  };
}

const badRequest = (data: ActionData) => json(data, { status: 400 });
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const studentId = formData.get("studentId");

  if (typeof studentId !== "string") {
    return badRequest({
      formError: `Form not submittied correctly`,
    });
  }

  const fields = { studentId };
  const fieldErrors = {
    studentId: validateStudentId(studentId),
  };

  const hasErrors = Object.values(fieldErrors).some((errMsg) => errMsg);

  if (hasErrors) {
    return badRequest({ fieldErrors, fields });
  }

  const res = await getResult(studentId);
  console.log(res);
  return json(res);
};

const inputClassName =
  "flex-auto p-4 block rounded-lg font-medium outline-none border border-transparent focus:border-green-500 focus:text-green-500";
const ResultRoute = () => {
  const formData = useActionData<ActionData>();
  const transition = useTransition();
  const isFetching = Boolean(transition.submission);

  return (
    <div className="container mx-auto p-4">
      <Form method="post" className="grid space-y-4 py-4">
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
          disabled={isFetching}
        >
          {isFetching ? "Fetching..." : "Submit"}
        </button>
      </Form>

      <div className="">
        {formData?.status == "FAILED" ? (
          <p>{formData?.message?.message}</p>
        ) : null}
        {formData?.status == "SUCCESS" ? (
          <div className="flex flex-col space-y-2">
            <h1>Your Results</h1>
            <p>{formData.cgpa}</p>
            {formData.details?.map((course) => (
              <>
                <div className="bg-slate-200-600 text-gray-500 font-semibold text-lg p-4 rounded-md shadow-xl">
                  <p>
                    Course name:
                    <span className="mx-2 text-base font-mono">
                      {course.name}
                    </span>
                  </p>
                  <p>
                    Credit:
                    <span className="mx-2 text-base font-mono">
                      {course.credit}
                    </span>
                  </p>
                  <p>
                    Marks:
                    <span className="mx-2 text-base font-mono">
                      {course.marks}
                    </span>
                  </p>
                </div>
              </>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ResultRoute;
