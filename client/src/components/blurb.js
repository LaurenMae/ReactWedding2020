import React from 'react';
import { BlurbContext } from '../Context';

export default function Blurb() {
    return (
        <BlurbContext.Consumer>
        {({name, text, image}) => (
            <div style={{display: 'inline-block', margin: '1em'}}>
                <img style={{borderRadius: '10em', width: '10em', float: 'left'}} src={require(`../images/${image}`)} alt={name} />
                <div style={{margin: '1em', float: 'left'}}>
                    <h3>{name}</h3>
                    <span dangerouslySetInnerHTML={{__html: text}}></span>
                </div>
            </div>
        )}
        </BlurbContext.Consumer>
    );
}