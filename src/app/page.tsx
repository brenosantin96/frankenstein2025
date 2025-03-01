// app/page.tsx (Server Component)
import { useApi } from "@/api/api";
import TaskList from "../components/TaskList";

export default async function Home() {

    const userId = 1; // Aqui você deve recuperar o ID dinamicamente (ex: do token)
    const tasks = await useApi.getExampleTasks();

    return (

        <>
            <TaskList allTasks={tasks} />
        </>
    );
}
