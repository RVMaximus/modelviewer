import "./Toaster.scss";

type ToasterProps = {
    type: string,
    content: string
}

export function Toaster(props: ToasterProps) {
    return (
        <>
            <div className={`toasterCard ${props.type}`}>
                <p className="content">{props.content}</p>
            </div>
        </>
    )
}