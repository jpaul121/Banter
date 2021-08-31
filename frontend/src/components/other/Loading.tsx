import React from 'react'
import loading from '../../loading.gif'

function Loading() {
  return (
    <div>
      <img
        style={{
            position: 'absolute',
            borderRadius: '10px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}
        src={loading}
      />
    </div>
  );
}

export default Loading
