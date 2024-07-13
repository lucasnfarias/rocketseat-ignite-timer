import { differenceInSeconds } from "date-fns";
import { useEffect } from "react";
import { useCycles } from "../../../../hooks/cycles";
import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
  const {
    activeCycle,
    amountSecondsPassed,
    finishCurrentCycle,
    updateActiveCycleId,
    updateAmountSecondsPassed,
  } = useCycles();

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDiff >= totalSeconds) {
          finishCurrentCycle();

          updateAmountSecondsPassed(totalSeconds);
          updateActiveCycleId(null);

          clearInterval(interval);
        } else {
          updateAmountSecondsPassed(secondsDiff);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    finishCurrentCycle,
    updateActiveCycleId,
    updateAmountSecondsPassed,
  ]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} \u263A ${activeCycle.task}`;
    } else {
      document.title = "⏳ Ignite timer ⏳";
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
