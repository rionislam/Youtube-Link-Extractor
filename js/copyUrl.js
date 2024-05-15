let copyUrl = (e) => {
    const container = e.closest('.container');
    if (container.getElementsByClassName('copied')[0] == null) {
        const urlElement = container.querySelector('a');
        const url = urlElement.href;
        navigator.clipboard.writeText(url)
        .then(function() {
        container.insertAdjacentHTML('beforeend', '<div class="copied">Copied</div>');
        })
        .catch(function(error) {
        console.log(error);
        });
    }
    
}

export default copyUrl;