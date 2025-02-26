export default function EmailRow({title, sender, content, timestamp}: {title: string, sender: string, content: string, timestamp: string}) {
    return (
        <div className="flex flex-col gap-2 w-full h-32 py-4 px-8 border-b-1">
            <span className="flex gap-2 items-center">
                <label className="flex items-center cursor-pointer relative">
                    <input type="checkbox" className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id="check" />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </label>
                <h4 className="text-xs text-gray-500 truncate font-semibold">{sender}</h4>
            </span>
            <span className="flex gap-8 justify-between items-center">
                <h2 className="truncate font-bold">{title}</h2>
                <p className="text-xs text-gray-500 font-semibold">{timestamp}</p>
            </span>
            <p className="text-xs text-gray-500 line-clamp-2">{content}</p>
        </div>
    )
}