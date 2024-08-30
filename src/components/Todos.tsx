import {Checkbox} from "./Checkbox.tsx";
import {Button, Menu, MenuItem, MenuTrigger, Popover} from "react-aria-components";
import {EditModal} from "./EditModal.tsx";
import {CreateModal} from "./CreateModal.tsx";
import {deleteTask, getTasks, Task} from "../Api.ts";
import {useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthContext.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export function Todos() {
    const queryClient = useQueryClient()

    const [editModal, setEditModal] = useState<undefined | Task>(undefined)
    const [createModal, setCreateModal] = useState<boolean>(false)

    const {logout, token} = useContext(AuthContext)

    const query = useQuery({
        queryKey: ['todos'],
        queryFn: () => getTasks(token),
    });

    const tasks = query.data


    async function removeTask(task) {
        await deleteTask(task.id, token)
        await queryClient.invalidateQueries({ queryKey: ['todos'] })
    }

    function onEditClose() {
        setEditModal(undefined)
    }

    function onCreateClose() {
        setCreateModal(false)
    }

    return (
        <div className="h-[100vh] flex justify-center items-center">
            <div className="max-w-[972px] w-full py-[9px]">
                <div className="flex mb-[10px]">
                    <p className="flex-1">Welcome {localStorage.getItem('username')}</p>
                    <button onClick={logout} className="text-[17px]">Logout</button>
                </div>
                {query.isFetching ? 'Loading...' : (
                    <div id="tasks">
                        {tasks?.map((task) => {
                            return (<div key={task.id}
                                         className="border border-[#c7c7c7] rounded-[15px] flex py-[22px] px-[19px] items-center gap-[16px] mb-[11px]">
                                <Checkbox task={task}
                                          isChecked={task.attributes.done}/>
                                <p className="flex-1">{task.attributes.title}</p>
                                <MenuTrigger>
                                    <Button aria-label="Menu">☰</Button>
                                    <Popover className="border border-[#C7C7C7] bg-white rounded-[15px]">
                                        <Menu className="px-[21px] py-[14px] space-y-[16px]">
                                            <MenuItem className="text-center"
                                                      onAction={() => setEditModal(task)}>Edit</MenuItem>
                                            <MenuItem className="text-red-500 text-center"
                                                      onAction={() => removeTask(task)}>Delete</MenuItem>
                                        </Menu>
                                    </Popover>
                                </MenuTrigger>
                            </div>)
                        })}
                        <Button onPress={() => setCreateModal(true)} className="text-[#2400FF] border-[2px] border-[#2400FF] rounded-[15px] py-[22px] text-md w-full">Create
                            new</Button>
                    </div>
                )}
                <EditModal task={editModal} onClose={onEditClose}/>
                <CreateModal isOpen={createModal} onClose={onCreateClose}/>
            </div>
        </div>
    )
}