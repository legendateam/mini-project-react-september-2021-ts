import React, {FC, useRef} from 'react';
import Plyr, {APITypes} from "plyr-react";
import "plyr-react/dist/plyr.css";

import {IVideosDetailProp} from "../../intefaces";
import './VideoDetail.css'

const VideoDetail: FC<IVideosDetailProp|undefined> = ({video}) => {
    const videoId = video?.key;
    const provider = "youtube";
    const videoOptions = undefined;

    const ref = useRef<APITypes>(null);

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