const Part = ({ part }) => {
    return (
        <p>
            <span>{part.name}</span> {" : "}
            <span>{part.exercises}</span>
        </p>
    )
}

export default Part