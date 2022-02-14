import React, {FC, useEffect, useRef, useState} from 'react';
import Plyr, {APITypes} from "plyr-react";
import "plyr-react/dist/plyr.css";

import {IVideos} from "../../intefaces";
import './VideoDetail.css'
import {useAppSelector} from "../../hooks";

const VideoDetail: FC = () => {
    const {movieDetail} = useAppSelector(state => state.moviesReducer);
    const [video, setVideo] = useState<IVideos | undefined>();

    const videoId = video?.key;
    const provider = "youtube";
    const videoOptions = undefined;

    const ref = useRef<APITypes>(null);

    useEffect(()=> {
        const find:IVideos|undefined = movieDetail?.videos.results.find(video =>video.type === 'Trailer');
        setVideo(find)
    },[movieDetail])

    const plyrVideo =
        videoId && provider ? (
            <Plyr
                ref={ref}
                source={{
                    type: "video",
                    sources: [
                        {
                            src: videoId,
                            provider: provider
                        }
                    ]
                }}
                options={videoOptions}
            />
        ) : null;

    return (
        <div className={'video__detail'}>
            {plyrVideo}
        </div>
    );
};

export {VideoDetail};