import { createContext, ReactNode, useState } from "react";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
  status: "ongoing" | "interrupted" | "finished";
}

interface CreateNewCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  finishCurrentCycle: () => void;
  updateActiveCycleId: (cycleId: string | null) => void;
  updateAmountSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateNewCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext<CyclesContextData>(
  {} as CyclesContextData
);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
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

  function createNewCycle({ task, minutesAmount }: CreateNewCycleData) {
    const id = new Date().getTime().toString();
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
      status: "ongoing",
    };

    setCycles((state) => [...state, newCycle]);
    updateActiveCycleId(id);
    updateAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
            status: "interrupted",
          };
        }
        return cycle;
      })
    );

    updateActiveCycleId(null);
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
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
