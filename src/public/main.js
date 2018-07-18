var onDeleteQuote = (obj) => {
    fetch('quotes', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': obj.name,
            'quote': obj.getAttribute('quote'),
        })
    }).then(function (response) {
        window.location.reload()
    })
}
