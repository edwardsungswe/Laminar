import { IconButton } from "@/components/Buttons"

import {
    Archive,
    Trash,
    SendHorizontal,
    Forward,
    Reply,
    ReplyAll,
    EllipsisVertical,
    Package2,
} from "lucide-react"

export default function EmailView({
    title,
    sender,
    content,
    timestamp,
}: {
    title: string
    sender: string
    content: string
    timestamp: string
}) {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex justify-between items-center w-full h-1/16 min-h-18 px-8 border-b-1 border-med">
                <div className="flex gap-4 items-center">
                    <IconButton name={"Archive"}>
                        <Archive className="w-5 h-5" />
                    </IconButton>
                    <IconButton name={"Move"}>
                        <Package2 className="w-5 h-5" />
                    </IconButton>
                    <div
                        data-orientation="vertical"
                        className="shrink-0 bg-med w-[1px] h-6 mx-2"
                    />
                    <IconButton name={"Delete"}>
                        <Trash className="w-5 h-5" />
                    </IconButton>
                </div>
                <div className="flex gap-4 items-center">
                    <IconButton name={"Reply"}>
                        <Reply className="w-5 h-5" />
                    </IconButton>
                    <IconButton name={"Reply All"}>
                        <ReplyAll className="w-5 h-5" />
                    </IconButton>
                    <IconButton name={"Forward"}>
                        <Forward className="w-5 h-5" />
                    </IconButton>
                    <IconButton name={"Send"}>
                        <SendHorizontal className="w-5 h-5" />
                    </IconButton>
                    <div
                        data-orientation="vertical"
                        className="shrink-0 bg-med w-[1px] h-6 mx-2"
                    />
                    <IconButton name={"More"}>
                        <EllipsisVertical className="w-5 h-5" />
                    </IconButton>
                </div>
            </div>
            <h1>{title}</h1>
            <span>
                <h1>{sender}</h1>
                <h3>{timestamp} </h3>
            </span>
            <div>
                <p>{content}</p>
            </div>
        </div>
    )
}
