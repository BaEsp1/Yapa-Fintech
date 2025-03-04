import React from 'react';
import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  const requirements = [
    { label: 'Mínimo 8 caracteres.', test: (pw: string) => pw.length >= 8 },
    { label: 'Por lo menos 1 carácter en minúscula.', test: (pw: string) => /[a-z]/.test(pw) },
    { label: 'Por lo menos 1 carácter en mayúscula.', test: (pw: string) => /[A-Z]/.test(pw) },
    { label: 'Por lo menos 1 carácter especial como: !@#$%^&*', test: (pw: string) => /[!@#$%^&*]/.test(pw) },
    { label: 'Por lo menos 1 carácter numérico.', test: (pw: string) => /\d/.test(pw) },
  ];

  return (
    <div>
      {requirements.map((req, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }} className='text-p2-medium'>
          <span style={{ color: req.test(password) ? 'green' : 'black' }}>{req.test(password) ? <FcApproval />:<FcHighPriority />}</span>
          <span style={{ marginLeft: 8, color: req.test(password) ? 'green' : 'black' }}>{req.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PasswordRequirements;
