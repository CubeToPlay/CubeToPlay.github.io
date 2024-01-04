export default function Error() {
    document.getElementById("title").prepend("Error");
    return (
        <>
            <h1 class="text-danger">Error.</h1>
            <h2 class="text-danger">An error occurred while processing your request.</h2>
        </>
    )
}