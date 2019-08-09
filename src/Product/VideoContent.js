import React from 'react'
import VideoInsertBlok from "./VideoInsertBlok";

function VideoContent(props) {
    return (

        <div >
            {
                props.data.length ? <div><span
                    className="catalog-element-span"> Видео </span>
                    {
                        props.data.map(vid => <div >

                                <a href={vid.name}>{vid.name}</a>
                            <VideoInsertBlok link_video={vid.name}/>
                            </div>
                        )
                    }
                </div> : null
            }
        </div>
    )

}

export default VideoContent