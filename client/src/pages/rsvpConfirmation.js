import React from 'react';

export default function RsvpConfirmation({ history }) {
    return (
        <div>
            <div style={{ border: '5px double rgba(240, 0, 0, .5)', borderRadius: '100%', margin: '1%', display: 'inline-flex', padding: '20px' }}>
                <h2 style={{ color: 'rgba(240, 0, 0, .5)'}}>Thank you</h2>
            </div>
            <br />
            A confirmation email has been sent to {history.location.state.email} <br />
            {
                history.location.state.attendance === 'attending'
                    ? <span>We can't wait to share our day with you</span>
                    : <span>We are sorry we won't see you on the day</span>
            }
        </div>
    );
}