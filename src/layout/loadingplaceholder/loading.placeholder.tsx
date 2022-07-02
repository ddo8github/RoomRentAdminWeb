import React from 'react';
import {Grid, Placeholder, Segment} from 'semantic-ui-react';

function LoadingPlaceholder() {
    return (
        <Placeholder fluid style={{marginTop: '10px'}}>
            <Segment.Group style={{borderWidth: '0px'}}>
                <Segment style={{minHeight: '50px'}}>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Placeholder style={{width: '100%', maxWidth: '100%'}}>
                                <Placeholder.Header>
                                    <Placeholder.Line length={'full'}/>
                                </Placeholder.Header>
                            </Placeholder>
                        </Grid.Column>
                        <Grid.Column><Placeholder style={{width: '100%', maxWidth: '100%'}}>
                            <Placeholder.Header>
                                <Placeholder.Line length={'full'}/>
                            </Placeholder.Header>
                        </Placeholder></Grid.Column>
                        <Grid.Column>
                            <Placeholder style={{width: '100%', maxWidth: '100%'}}>
                                <Placeholder.Header>
                                    <Placeholder.Line length={'full'}/>
                                </Placeholder.Header>
                            </Placeholder>
                        </Grid.Column>
                        <Grid.Column>
                            <Placeholder style={{width: '100%', maxWidth: '100%'}}>
                                <Placeholder.Header>
                                    <Placeholder.Line length={'full'}/>
                                </Placeholder.Header>
                            </Placeholder>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Segment.Group>
        </Placeholder>
    );
}

export default LoadingPlaceholder;
