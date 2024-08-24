import React, { createContext, useState, ReactNode } from 'react';

interface FamilyMember {
    name: string;
}

interface GuestContextType {
    familyName: string;
    setFamilyName: React.Dispatch<React.SetStateAction<string>>;
    members: FamilyMember[];
    setMembers: React.Dispatch<React.SetStateAction<FamilyMember[]>>;
}

export const GuestContext = createContext<GuestContextType | undefined>(undefined);

interface GuestProviderProps {
    children: ReactNode;
}

export const GuestProvider: React.FC<GuestProviderProps> = ({ children }) => {
    const [familyName, setFamilyName] = useState<string>('');
    const [members, setMembers] = useState<FamilyMember[]>([]);

    return (
        <GuestContext.Provider value={{ familyName, setFamilyName, members, setMembers }}>
            {children}
        </GuestContext.Provider>
    );
};
