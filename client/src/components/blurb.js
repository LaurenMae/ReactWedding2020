import React from 'react';
import { BlurbContext } from '../Context';

export default function Blurb() {
    return (
        <BlurbContext.Consumer>
        {({name, text, image}) => (
            <div style={{display: 'inline-block', margin: '2vw'}}>
                <img style={{borderRadius: '20vw', width: '25vw', float: 'left'}} src={require(`../images/${image}`)} alt={name} />
                <div style={{margin: '2vw', float: 'left'}}>
                    <h3 style={{fontSize: '5vw'}}>{name}</h3>
                    <span style={{fontSize: '3vw'}} dangerouslySetInnerHTML={{__html: text}}></span>
                </div>
            </div>
        )}
        </BlurbContext.Consumer>
    );
}