export default function Content({title, sender, content, timestamp}: {title: string, sender: string, content: string, timestamp: string}) {
    return (
        <div className="flex flex-col w-full h-full p-12">
            <h1>{title}</h1>
            <span>
                <h1>{sender}</h1>
                <h3>{timestamp}  </h3>
            </span>
            <div>
                <p>{content}</p>
            </div>
        </div>
    )
}