import React from 'react'

function VideoInsertBlok(props) {

    const video = (props.link_video.toString());

    const str = '<iframe width="560" height="315" src="' + video +
        '"; frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

    return (
        <div>
            <div className="catalog-element"><span
                className="catalog-element-span">Код для встраивания видео </span></div>
            <div>
            <textarea style={{width:"100%"}}>
                {str}
            </textarea>
            </div>
        </div>

    )

}

export default VideoInsertBlok