import React from 'react';
import {Grid, Placeholder, Segment} from 'semantic-ui-react';
import {Constants} from '../../config/constant';

function LoadingRoomsCompany() {
    const data: number[] = [1, 2, 3, 4, 5];
    return (
        <div style={{marginBottom: '10px', marginTop: '10px'}}>
            <Grid columns={Constants.CARD_PER_ROWS} stackable>
                {
                    data.map((m) => {
                        return (
                            <Grid.Column key={`colGrid${m}`}>
                                <Segment raised>
                                    <Placeholder>
                                        <Placeholder.Header image>
                                            <Placeholder.Line/>
                                            <Placeholder.Line/>
                                        </Placeholder.Header>
                                        <Placeholder.Paragraph>
                                            <Placeholder.Line length='medium'/>
                                            <Placeholder.Line length='short'/>
                                        </Placeholder.Paragraph>
                                    </Placeholder>
                                </Segment>
                            </Grid.Column>
                        );
                    })
                }
            </Grid>
        </div>
    );
}

export default LoadingRoomsCompany;
