import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/cycles";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map(
              ({
                id,
                task,
                minutesAmount,
                startDate,
                finishedDate,
                interruptedDate,
                status,
              }) => {
                const publishedDateRelativeToNow = formatDistanceToNow(
                  startDate,
                  {
                    locale: ptBR,
                    addSuffix: true,
                  }
                );
                return (
                  <tr key={id}>
                    <td>{task}</td>
                    <td>{minutesAmount} minutos</td>
                    <td>{publishedDateRelativeToNow}</td>
                    <td>
                      {status === "ongoing" && (
                        <Status statusColor="yellow">Em andamento</Status>
                      )}
                      {status === "interrupted" && (
                        <Status
                          title={interruptedDate?.toDateString()}
                          statusColor="red"
                        >
                          Interrompido
                        </Status>
                      )}
                      {status === "finished" && (
                        <Status
                          title={finishedDate?.toDateString()}
                          statusColor="green"
                        >
                          Concluído
                        </Status>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
