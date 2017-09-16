$(function(){
    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1])
    console.log(id)
    $.get('./recommend.json').then(function (response) {
        let songs = response
        console.log(songs)
        let song =songs.filter(s => s.id) 

        let title=song[id-1].title
        let imgBig=song[id-1].imgBig
        let imgSmall=song[id-1].imgSmall
        console.log(title,imgBig,imgSmall)

        initImg.call(undefined,imgBig,imgSmall)
        initText.call(undefined,title)
    })
    function initImg(imgBig,imgSmall){
        $('header').css('background',`transparent url('${imgBig}') no-repeat center`)
        $('.header').css('background-size','cover')
        $('.titleWrapper>img').attr('src',`${imgSmall}`)
    }

    function initText(title) {
        console.log('1231231321')
        console.log(title)
        $('#recommendTitle').text(title)
    }


    $.get('./songs.json').then((response) => {
        let items = response
        items.forEach((i) => {
            let $li = $(`
            <li>
            <span>${i.id}</span>
            <a href="./song.html?id=${i.id}">
                <h3>${i.name}</h3>
                <p>
                    <svg class="playSQ">
                        <use xlink:href="#icon-SQ"></use>
                    </svg>${i.singer} - ${i.special}</p>
                <a href="./song.html?id=${i.id}">
                    <svg class="playCircled">
                        <use xlink:href="#icon-play-circled"></use>
                    </svg>
                </a>
            </a>
        </li>
            `)
            $('#songsList>ol').append($li)
        });
    })
})