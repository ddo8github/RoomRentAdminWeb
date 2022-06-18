import React from 'react';
import {Loader} from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
}

function LoadingComponent(props: Props) {
    return (
        <div className={`ui active ${props.inverted ? 'inverted' : ''} dimmer`}>
            <Loader content={props.content}/>
        </div>
    );
}

export default LoadingComponent;
