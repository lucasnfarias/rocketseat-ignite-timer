import { createContext, ReactNode, useContext, useState } from "react";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
  status: "ongoing" | "interrupted" | "finished";
}

interface CyclesContextData {
  cycles: Cycle[];
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  finishCurrentCycle: () => void;
  updateActiveCycleId: (cycleId: string | null) => void;
  updateAmountSecondsPassed: (seconds: number) => void;
}

const CyclesContext = createContext<CyclesContextData>({} as CyclesContextData);

export const CyclesProvider = ({ children }: { children: ReactNode }) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function finishCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
            status: "finished",
          };
        }
        return cycle;
      })
    );
  }

  function updateActiveCycleId(cycleId: string | null) {
    setActiveCycleId(cycleId);
  }

  function updateAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        finishCurrentCycle,
        updateActiveCycleId,
        updateAmountSecondsPassed,
        setCycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export function useCycles(): CyclesContextData {
  const context = useContext(CyclesContext);

  return context;
}
