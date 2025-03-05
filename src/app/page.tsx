// app/page.tsx (Server Component)
import { useApi } from "@/api/funcApi";
import TaskList from "../components/TaskList";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import axios from "axios";

export default async function Home() {

    const token = (await cookies()).get("token")?.value;

    console.log("Token: ", token);

    if (token == null || token == undefined) {
        redirect('/login')
    }

    try {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const tasks = response.data;

        let tasksWithDate = tasks.map((task : any) => (
            {
                ...task,
                dateCreated: new Date(task.dateCreated),
                dateToFinish: new Date(task.dateToFinish),
                dateFinished: task.dateFinished ? new Date(task.dateFinished) : null,
            }
        ));

        console.log(response.data);

        return (

            <>
                <TaskList allTasks={tasksWithDate} />
            </>
        );

    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        return <p>Erro ao carregar tarefas.</p>;

    }



}
