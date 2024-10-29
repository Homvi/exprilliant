import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the shape of your context state
interface GameModeContextType {
  gameMode: string | null; // Assuming gameMode can be a string or null
  setGameMode: Dispatch<SetStateAction<string | null>>; // Use the correct type for the setter
}

// Create the context with a default value
const GameModeContext = createContext<GameModeContextType | undefined>(undefined);

interface GameModeProviderProps {
  children: ReactNode; // Define the type for children prop
}

export const GameModeProvider: React.FC<GameModeProviderProps> = ({ children }) => {
  const [gameMode, setGameMode] = useState<string | null>(null);

  return <GameModeContext.Provider value={{ gameMode, setGameMode }}>{children}</GameModeContext.Provider>;
};

// Custom hook to use the GameMode context
export const useGameMode = () => {
  const context = useContext(GameModeContext);
  if (context === undefined) {
    throw new Error('useGameMode must be used within a GameModeProvider');
  }
  return context;
};
