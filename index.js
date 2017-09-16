$(function () {
    console.log('滴滴滴滴')
    $('#searchSong').focus()
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
                    </svg>${i.singer}-${i.special}</p>
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
    $('.siteNav').on('click', 'ol.tabItems>li', function (e) {
        let $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        let index = $li.index()
        $li.trigger('tabChange', index)
        $('.tabContent>li').eq(index).addClass('active')
            .siblings().removeClass('active')
    })
    $('.siteNav').on('tabChange', function (e, index) {
        let $li = $('.tabContent>li').eq(index)
        if ($('.tabContent>li').eq(index).attr('data-downloaded') === 'yes') {
            return
        }
        $li.attr('data-downloaded', 'yes')
        if (index === 1) {
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
                    $('#hotSongs').append($li)
                });
                $('#tab2Loading').remove()
                $li.attr('data-downloaded', 'yes')
            })
        } else if (index === 2) {
            console.log('搜索页')
            $('#searchSong').focus()
            console.log('哈哈哈')
            $.get('./songs.json').then(function(response){
                response.forEach((i)=>{
                    let $li=$(`
                    <li>
                        <a href="./song.html?id=${i.id}">${i.name}</a>
                    </li>
                    `)
                    $('#hotSearchContent').append($li)
                    $li.attr('data-downloaded', 'yes')
                })
            })
        }
    })

    let timer = undefined
    $('input#searchSong').on('input', function (e) {
        $('#clearSearch').css('display', 'block')
        $('#output').css('display', 'block')
        $('.hotSearch').css('display', 'none')
        $('#searchContent').css('display', 'block')
        $('#output>ul>li').remove()
        $('#output>p').text('')        
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        $('#searchContent').text('搜索:"' + value + '"')
        if (value === '') {
            $('#searchContent').css('display','none')
            $('.hotSearch').css('display','block')
            $('#clearSearch').css('display', 'none')
            clearTimeout(timer)
            $('#output>ul>li').remove()
            $('#output').css('display','none')
            return
        }
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            $('#output').css('display','block')
            search(value).then((result) => {
                timer = undefined
                if (result.length !== 0) {
                    result.forEach((i) => {
                        let $li = $(`
                        <li>
                            <a href="./song.html?id=${i.id}">
                                <svg class="icon icon-search">
                                    <use xlink:href="#icon-search"></use>
                                </svg>
                                <p>${i.name}</p>
                            </a>
                        </li>
                        `)
                        $('#output>ul').append($li)
                        $('#output>p').css('display','none')
                    })
                } else {
                    $('#output>p').css('display','block')  
                    $('#output>p').text('模拟数据，所以只有那么几首歌~~~~')
                }
            })
        }, 1000)
    })

    $('#clearSearch').on('click', function () {
        $('#searchSong').val('')
        $('#output').css('display', 'none')
        $('#output').text('')
        clearTimeout(timer)
        $('.hotSearch').css('display', 'block')
        $('#clearSearch').css('display', 'none')
        $('#searchContent').css('display', 'none')
    })

    function search(keyword) {
        console.log('搜索' + keyword)
        return new Promise((resolve, reject) => {
            var database = [{
                    "id": 1,
                    "name": "Panama"
                },
                {
                    "id": 2,
                    "name": "作曲家"
                },
                {
                    "id": 3,
                    "name": "Despacito"
                },
                {
                    "id": 4,
                    "name": "远走高飞"
                },
                {
                    "id": 5,
                    "name": "讲不出再见"
                },
                {
                    "id": 6,
                    "name": "成都"
                },
                {
                    "id": 7,
                    "name": "I'm Yours"
                },
                {
                    "id": 8,
                    "name": "Million Reasons"
                },
                {
                    "id": 9,
                    "name": "Faith"
                },
                {
                    "id": 10,
                    "name": "富士山下"
                }
            ]
            let result = database.filter((item) => {
                return item.name.indexOf(keyword) >= 0
            })
            setTimeout(function () {
                console.log('搜索到' + keyword + '结果')
                resolve(result)
            }, (Math.random() * 200 + 1000))
        })
    }
})