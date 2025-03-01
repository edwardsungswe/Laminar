import { useState, ReactElement, SetStateAction } from "react"

export function IconButton({ children, name, callback, callbackArgs }: { children: ReactElement; name: string; callback?: any; callbackArgs?: any }) {
    const [isHovered, setIsHovered] = useState<boolean>(false)

    function handleClick() {
        if (callback) {
            if (callbackArgs) callback(callbackArgs)
            else callback()
        }
    }

    return (
        <div className="relative">
            <button
                className="flex justify-center items-center w-10 h-10 cursor-pointer rounded-lg transition duration-100 hover:bg-dark active:bg-med-dark"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => handleClick()}
            >
                {children}
            </button>
            <div
                className={`absolute flex justify-center items-center top-12 left-1/2 w-fit h-6 p-2 transform -translate-x-1/2 
                ${isHovered ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out duration-200 rounded-lg select-none bg-white`}
            >
                <h4 className="text-xs text-black text-nowrap font-medium">{name}</h4>
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
                            state == stateNames[index] ? "bg-black" : "transition duration-100 hover:bg-med-dark"
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

export function CheckBox({ ref, callback, callbackArgs }: { ref: React.Ref<HTMLInputElement>; callback?: any; callbackArgs?: any }) {
    return (
        <label
            className="flex items-center cursor-pointer relative"
            onClick={() => {
                if (callback) {
                    if (callbackArgs) callback(callbackArgs)
                    else callback()
                }
            }}
        >
            <input
                ref={ref}
                type="checkbox"
                className="peer h-6 w-6 cursor-pointer appearance-none rounded shadow hover:shadow-md border border-med-light checked:bg-light checked:border-white"
            />
            <span className="absolute text-black opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                >
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </span>
        </label>
    )
}
