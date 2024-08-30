import {Task, updateTask} from "../Api.ts";
import {AuthContext} from "../contexts/AuthContext.tsx";
import {useContext} from "react";
import {useQueryClient} from "@tanstack/react-query";

interface CheckboxProps {
    isChecked: boolean,
    task: Task,
}

export function Checkbox(props: CheckboxProps) {
    const {token} = useContext(AuthContext)

    const queryClient = useQueryClient()

    async function checkboxOnClick(task) {
        await updateTask(task.id, {done: !task.attributes.done}, token)
        await queryClient.invalidateQueries({ queryKey: ['todos'] })
    }

    return (
        <div onClick={() => checkboxOnClick(props.task)} className={`rounded-full w-[30px] h-[30px] ${props.isChecked ? "bg-[#99BD75]" : "bg-[#D9D9D9] hover:bg-[#B6B6B6]"}`}>
        </div>
    )
}