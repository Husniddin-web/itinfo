const { response } = require("express")

async function getAuthor() {
    const accessToken = localStorage.getItem("accessToken")
    try {
        const res = await fetch("http://localhost:3000/api/author", {
            method: GET,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors" // keyin organamiz
        })
        if (res.ok) {
            const authors = await res.json()
            displayAuthor(authors.data)

        } else {
            const error = await res.json()
            console.log("Request faild", error)
        }
    } catch (error) {
        console.log("error ", error)
    }
}


function displayAuthor(data) {
    
}