import ApplyTaskForm from "../../../components/TaskApplication/ApplyTaskForm";

export default function ApplyPage({ params }: { params: { taskId: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <ApplyTaskForm taskTitle={params.taskId} />
    </div>
  );
}
