// Update the import path if ApplyJobForm is located elsewhere, for example:
import ApplyJobForm from "../../../components/JobApplication/ApplyJobForm";
// Or ensure that '../../../components/ApplyJobForm.tsx' exists at the specified path.

export default function ApplyPage({ params }: { params: { jobId: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <ApplyJobForm jobTitle={params.jobId} />
    </div>
  );
}
