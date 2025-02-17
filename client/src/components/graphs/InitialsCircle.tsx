import React from "react";

interface InstrumentInitialsCircleProps {
  id: string;
}

const InstrumentInitialsCircle: React.FC<InstrumentInitialsCircleProps> = ({ id }) => {

  const initials = id.slice(0, 2).toUpperCase();

  return (
    <div
      style={{
        width: '50px', 
        height: '50px', 
        borderRadius: '50%',
        backgroundColor: '#C3DCFF', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', 
        fontWeight: 'bold',
        fontSize: '20px', 
      }}
    >
      {initials}
    </div>
  );
};

export default InstrumentInitialsCircle;
