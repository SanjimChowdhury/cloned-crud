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

const messageDiv = document.querySelector('#message')
const deleteBtn = document.querySelectorAll('.del')


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

//love button
const loveButtons = document.querySelectorAll('.love');

loveButtons.forEach(button => {
    button.addEventListener('click', () => {
        const quoteId = button.dataset.id;

        fetch(`/love/${quoteId}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Failed to update love count');
        })
        .then(response => {
            // Update the love count on the UI
            const loveCountElement = button.querySelector('.love-count');
            loveCountElement.textContent = response.loveCount;
        })
        .catch(err => {
            console.error(err);
        });
    });
});