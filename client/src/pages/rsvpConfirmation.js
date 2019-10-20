import React from 'react';

export default function RsvpConfirmation({ history }) {
    return (
        <div>Thank you, your RSVP has been saved. A confirmation email has been sent to {history.location.state}</div>
    );
}