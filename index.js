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
            // return
            $.get('./songs.json').then((response) => {
                // $li.find('ol').children().text(response.content)
                // $li.text(response.content)
                console.log(response)
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
                            </svg>演唱者1-专辑1</p>
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
            // return
            // $.get('./page3.json').then((response) => {
            //     $li.text(response.content)
            //     $li.attr('data-downloaded', 'yes')
            // })
        }
    })

    let timer = undefined
    $('input#searchSong').on('input', function (e) {
        $('#clearSearch').css('display', 'block')
        $('#output').css('display', 'block')
        $('.hotSearch').css('display', 'none')
        $('#searchContent').css('display', 'block')
        $('#output>ul>li').remove()
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
            search(value).then((result) => {
                timer = undefined
                if (result.length !== 0) {
                    console.log(result)
                    // $('#output p').text(result.map((song) => song.name).join(','))
                    // let $name=result.map((song)=>song.name)

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
                    })
                } else {
                    $('#output p').text('模拟数据，所以只有那么几首歌')
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
                    "name": "Despacito(Remix)"
                },
                {
                    "id": 4,
                    "name": "远走高飞"
                },
                {
                    "id": 5,
                    "name": "讲不出再见-Live"
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