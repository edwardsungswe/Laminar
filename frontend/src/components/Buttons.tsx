import { useState, ReactElement } from "react"

export function IconButton({
    children,
    name,
}: {
    children: ReactElement
    name: string
}) {
    const [isHovered, setIsHovered] = useState<boolean>(false)

    return (
        <div className="relative">
            <button
                className="flex justify-center items-center w-10 h-10 cursor-pointer rounded-lg transition duration-100 hover:bg-dark active:bg-med-dark"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children}
            </button>
            <div
                className={`absolute flex justify-center items-center top-12 left-1/2 w-fit h-6 p-2 transform -translate-x-1/2 
                ${
                    isHovered ? "opacity-100" : "opacity-0"
                } transition-opacity ease-in-out duration-200 rounded-lg select-none bg-white`}
            >
                <h4 className="text-xs text-black text-nowrap font-medium">
                    {name}
                </h4>
            </div>
        </div>
    )
}

export function SwitchButton({
    buttonNames,
    stateNames,
    state,
    setState,
}: {
    buttonNames: string[]
    stateNames: string[]
    state: string
    setState: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <div className="flex gap-1 justify-evenly h-10 my-2 p-1 text-sm rounded-lg bg-dark">
            {buttonNames.map((buttonName, index) => {
                return (
                    <button
                        key={index}
                        className={`w-16 cursor-pointer rounded-md ${
                            state == stateNames[index]
                                ? "bg-black"
                                : "transition duration-100 hover:bg-med-dark"
                        }`}
                        onClick={() => {
                            setState(stateNames[index])
                        }}
                    >
                        {buttonName}
                    </button>
                )
            })}
        </div>
    )
}
