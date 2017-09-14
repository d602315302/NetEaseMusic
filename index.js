$(function () {
    $.get('./songs.json', function (response) {
        let items = response
        items.forEach((i) => {
            let $li = $(`
            <li>
            <a href="./song.html?id=${i.id}">
                <h3>${i.name}</h3>
                <p>
                    <svg class="playSQ">
                        <use xlink:href="#icon-SQ"></use>
                    </svg>演唱者1-专辑1</p>
                <a href="./song.html?id=${i.id}">
                    <svg class="playCircled">
                        <use xlink:href="#icon-play-circled"></use>
                    </svg>
                </a>
            </a>
        </li>
            `)
            $('#lastestMusic').append($li)
        });
        $('#lastestMusicloading').remove()
    })
})