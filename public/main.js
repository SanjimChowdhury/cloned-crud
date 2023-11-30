const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.',
        }),
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            console.log(response)
        })
})

const deleteBtn = document.querySelectorAll('.del')
const messageDiv = document.querySelector('#message')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})
async function deleteTodo(event) {
    const todoId = event.target.parentNode.dataset.id;
    console.log(todoId);
    try{
        const response = await fetch('/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
// deleteButton.addEventListener('click', _ => {
//     fetch('/quotes', {
//         method: 'delete',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Darth Vader'
//         })
//     })
//         .then(res => {
//             if (res.ok) return res.json()
//         })
//         .then(response => {
//             if (response === 'No quote to delete') {
//               messageDiv.textContent = 'No Darth Vader quote to delete'
//             } else {
//               window.location.reload(true)
//             }
//           })
// })