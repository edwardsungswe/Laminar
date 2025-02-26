import Add from '@mui/icons-material/Add'
import WavesIcon from '@mui/icons-material/Waves'
import InboxIcon from '@mui/icons-material/Inbox'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ArticleIcon from '@mui/icons-material/Article'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import WorkIcon from '@mui/icons-material/Work'
import GroupIcon from '@mui/icons-material/Group'

export default function SideBar() {
    return (
        <div className="flex flex-col gap-8 w-1/6 h-full px-8 py-8">
            <div className="flex justify-center align-items h-fit">
                <div className="flex gap-2 justify-start items-center w-full">
                    <WavesIcon sx={{ width: 40, height: 40 }} className="text-blue-400" />
                    <h1 className="font-bold text-2xl tracking-wide">LAMINAR</h1>
                </div>
            </div>
            <button className="flex gap-x-4 justify-center items-center w-full h-16 px-4 mb-4 rounded-xl bg-blue-400 text-white drop-shadow-sm">
                <Add />
                <h1 className="w-full">Compose</h1>
            </button>
            <div className="flex flex-col gap-8 h-7/8">
                <div className="flex flex-col gap-8">
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <InboxIcon className="text-blue-400" />
                            <h2>Inbox</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-blue-400 bg-blue-100">97</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <BookmarkIcon className="text-gray-400" />
                            <h2 className="text-gray-400">Bookmarked</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-gray-400">68</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <ArticleIcon className="text-gray-400" />
                            <h2 className="text-gray-400">Drafts</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-gray-400">7</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <SendIcon className="text-gray-400" />
                            <h2 className="text-gray-400">Sent</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-gray-400">22</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <DeleteIcon className="text-gray-400" />
                            <h2 className="text-gray-400">Trash</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-gray-400">8</div>
                    </div>
                </div>
                <hr></hr>
                <div className="flex flex-col gap-8">
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <FamilyRestroomIcon className="text-gray-400" />
                            <h2 className="text-gray-400">Family</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-gray-400">7</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <WorkIcon className="text-gray-400" />
                            <h2 className="text-gray-400">Work</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-gray-400">41</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <GroupIcon className="text-gray-400" />
                            <h2 className="text-gray-400">Friends</h2>
                        </span>
                        <div className="flex justify-center items-center h-6 w-6 rounded-full text-sm text-gray-400">12</div>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span className="flex gap-4">
                            <Add className="text-gray-400" />
                            <h2 className="text-gray-400">Add New Folder</h2>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}