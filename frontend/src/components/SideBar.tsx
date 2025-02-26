import {
    Plus,
    Inbox,
    Bookmark,
    FileText,
    Send,
    Trash,
    Contact,
    Briefcase,
    Users
} from 'lucide-react'

export default function SideBar() {
    return (
        <div className="flex flex-col gap-4 w-1/6 h-full font-light">
            <div className="flex justify-between items-center w-full h-1/16 px-4 border-b-1 border-med">
                <button className="w-full h-10 border-1 border-med rounded-lg text-lg">Ryan Lee</button>
            </div>
            <div className="px-4">
                <button className="flex gap-x-4 justify-center items-center w-full h-10 px-4 mb-4 rounded-xl font-medium text-black bg-light transition duration-150 cursor-pointer hover:bg-white hover:scale-102">
                    <Plus />
                    <h1 className="w-full">Compose</h1>
                </button>
            </div>
            <div className="flex flex-col gap-8 text-sm">
                <div className="flex flex-col gap-8 px-8">
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <Inbox className="text-white w-4 h-4" />
                            <h2>Inbox</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-black bg-white">97</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <Bookmark className="w-4 h-4" />
                            <h2 className="text-med">Bookmarked</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-med">68</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <FileText className="w-4 h-4" />
                            <h2 className="text-med">Drafts</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-med">7</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <Send className="w-4 h-4" />
                            <h2 className="text-med">Sent</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-med">22</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <Trash className="w-4 h-4" />
                            <h2 className="text-med">Trash</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-med">8</div>
                    </div>
                </div>
                <hr></hr>
                <div className="flex flex-col gap-8 px-8">
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <Contact className="w-4 h-4" />
                            <h2 className="text-med">Family</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-med">7</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <Briefcase className="w-4 h-4" />
                            <h2 className="text-med">Work</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-med">41</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <Users className="w-4 h-4" />
                            <h2 className="text-med">Friends</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-med">12</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <Plus className="w-4 h-4" />
                            <h2 className="text-med">Add New Folder</h2>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}