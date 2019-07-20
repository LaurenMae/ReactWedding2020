import React from 'react';
import { BlurbContext } from '../Context';

export default function Blurb() {
    return (
        <BlurbContext.Consumer>
        {({name, text, image}) => (
            <div>
                <img src={image} alt="" />
                <b>{name}</b><br />
                <span dangerouslySetInnerHTML={{__html: text}}></span><br /><br />
            </div>
        )}
        </BlurbContext.Consumer>
    );
}