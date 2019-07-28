import React from 'react';
import { Blurb2Context } from '../Context';

export default function Blurb2() {
    const redirect = (url) => {
        console.log(url);
    };

    return (
        <Blurb2Context.Consumer>
        {({name, text, url, address, postcode}) => (
            <div style={{border: '1px solid black', display: 'inline-block', padding: '1em', margin: '2em', width: '30em'}}>
                <h3>{name}</h3>
                <h4>{address}</h4>
                <h4>{postcode}</h4>
                <p dangerouslySetInnerHTML={{__html: text}}></p>
                <button onClick={() => { redirect(url); }}>Book Online</button>
            </div>
        )}
        </Blurb2Context.Consumer>
    );
}