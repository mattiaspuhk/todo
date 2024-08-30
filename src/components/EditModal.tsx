import {
    Button,
    Dialog,
    Heading,
    Input,
    Modal,
    ModalOverlay,
    TextField
} from 'react-aria-components';
import {useContext, useEffect, useState} from "react";
import {Task, updateTask} from "../Api.ts";
import {AuthContext} from "../contexts/AuthContext.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface ModalProps {
    task: Task | undefined,
    onClose: () => void,
}

export function EditModal(props: ModalProps) {
    const [value, setValue] = useState('')
    const {token} = useContext(AuthContext);

    const queryClient = useQueryClient()

    useEffect(() => {
        if (props.task) {
            setValue(props.task.attributes.title)
        }
    }, [props.task])

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const mutation = useMutation({
        mutationFn: (data: { id: string, title: string }) => updateTask(data.id, {title: data.title}, token),
        onSuccess: () => {
            props.onClose()
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
    })

    async function handleEdit(task, newTitle) {
        mutation.mutate({id: task.id, title: newTitle})
    }

    return (
        <ModalOverlay isOpen={!!props.task} onOpenChange={props.onClose} className={({isEntering, isExiting}) => `
          fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur
          ${isEntering ? 'animate-in fade-in duration-300 ease-out' : ''}
          ${isExiting ? 'animate-out fade-out duration-200 ease-in' : ''}
        `}>
            <Modal className={({isEntering, isExiting}) => `
            w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl
            ${isEntering ? 'animate-in zoom-in-95 ease-out duration-300' : ''}
            ${isExiting ? 'animate-out zoom-out-95 ease-in duration-200' : ''}
          `}>
                <Dialog>
                    {({close}) => (
                        <form className="space-y-[27px]">
                            <Heading className="flex justify-center" slot="title">Edit task</Heading>
                            <TextField autoFocus>
                                <Input value={value} onChange={onChange}
                                       className="w-full py-[19px] px-[18px] text-[17px] border border-[#D2D2D2] rounded-[15px] bg-[#F2F2F2]"/>
                            </TextField>
                            <div className="flex gap-[27px]">
                                <Button isDisabled={mutation.isPending} onPress={() => handleEdit(props.task, value)}
                                        className="flex-1 text-[#2400FF] border-[2px] border-[#2400FF] rounded-[15px] py-[22px] text-md w-full">
                                    Save
                                </Button>
                                <Button onPress={close}
                                        className="flex-1 text-[red] border-[2px] border-[red] rounded-[15px] py-[22px] text-md w-full">
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}
                </Dialog>
            </Modal>
        </ModalOverlay>
    )
}