$(function () {

    let id = parseInt(location.search.match(/\bid=([^&])*/)[1], 10)

    $.get('./songs.json').then(function (response) {
        let songs = response
        let song = songs.filter(s => s.id === id)[0]
        let {
            url
        } = song
        let audio = document.createElement('audio')
        audio.src=url
        audio.oncanplay = function () {
            audio.play()
            $('.disc-container').addClass('playing')
        }
        $('.icon-pause').on('click', function () {
            audio.pause()
            $('.disc-container').removeClass('playing')
        })
        $('.icon-play').on('click', function () {
            audio.play()
            $('.disc-container').addClass('playing')
        })
    })

    $.get('/lyric.json').then(function (object) { //拿到JSON对象
        let {
            lyric
        } = object
        let array = lyric.split('\n') //歌词进行分割（时间+歌词）
        let regex = /^\[(.+)\](.*)$/ //歌词标准 
        array = array.map(function (string, index) { //map每一句歌词   
            let matches = string.match(regex) //校验是否符合正则规定
            if (matches) {
                return {
                    time: matches[1],
                    words: matches[2]
                }
            }
        })
        let $lyric = $('.lyric')
        array.map(function (object) { //歌词
            let $p = $('<p/>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })
    })
})