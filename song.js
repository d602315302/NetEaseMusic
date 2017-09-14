$(function () {
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

    let audio = document.createElement('audio')
    audio.src = '//ow8dqryc5.bkt.clouddn.com/C4000027zPYs3A9fyb.m4a'
    audio.oncanplay = function () {
        audio.play()
        $('.disc-container').addClass('playing')
    }
    $('.icon-pause').on('click',function(){
        audio.pause()
        $('.disc-container').removeClass('playing')
    })
    $('.icon-play').on('click',function(){
        audio.play()
        $('.disc-container').addClass('playing')
    })
})